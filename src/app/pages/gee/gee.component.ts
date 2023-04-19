import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { GeeService } from '../../services/gee.service';
import { GRecord } from '../../models/GRecord';
import { NbDialogService } from '@nebular/theme';
import { NewGrecordComponent } from '../new-grecord/new-grecord.component';
import { NewFuelCardComponent } from '../new-fuel-card/new-fuel-card.component';
import { NewCrecordComponent } from '../new-crecord/new-crecord.component';
import { FCard } from '../../models/FCard';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { CRecord } from '../../models/CRecord';
import { GEE } from '../../models/GEE';

@Component({
  selector: 'gee',
  templateUrl: './gee.component.html',
  styleUrls: ['./gee.component.css'],
})
export class GeeComponent implements OnInit {
  gees: GEE[] = [];
  cards: FCard[] = [];
  card_records: CRecord[] = [];
  user = {id: 0};
  selectedGEE: GEE = {};
  grecords: GRecord[] = [];
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 3000,
  });
  selectedCard: FCard = {};

  constructor(private geeService: GeeService, private authService: NbAuthService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.geeService.listGEEsByUser(this.user.id).subscribe((res: GEE[]) => {
        this.gees = res;
        if (this.gees.length > 0) {
          this.selectedGEE = this.gees[0];
          this.geeService.listGEERecords(this.selectedGEE.id).subscribe((grcords: GRecord[]) => {
            this.grecords = grcords;
          });
          this.getCards();
        }
      });
    });
  }

  getCards() {
    this.geeService.listCardsByGEE(this.selectedGEE.id).subscribe((cards: FCard[]) => {
      this.cards = cards;
      if (this.cards.length > 0) {
        this.selectedCard = this.cards[0];
        this.geeService.listCardsRecords(this.selectedCard.id).subscribe((records: CRecord[]) => {
          this.card_records = records;
        });
      }
    });
  }

  onChangeGee(selected: GEE) {
    this.geeService.listGEERecords(selected.id).subscribe((grcords: GRecord[]) => {
      this.grecords = grcords;
      // console.log(this.grecords);
    });
    this.getCards();
  }

  onChangeCard(selected: FCard) {
    this.geeService.listCardsRecords(selected.id).subscribe((records: CRecord[]) => {
      this.card_records = records;
    });
  }

  openNew() {
    const contexto = {title: 'Nueva operación'};
    if (this.grecords.length > 0) {
      // tslint:disable-next-line: max-line-length
      this.dialogService.open(NewGrecordComponent, {context: {title: 'Nueva operación', operacion_anterior: this.grecords[0]}}).onClose.subscribe(() => {
        this.onChangeGee(this.selectedGEE);
      });
      // Object.defineProperty(contexto, 'operacion_anterior', {value: this.grecords[0]});
      // console.log(contexto);
    } else {
      this.dialogService.open(NewGrecordComponent, {context: {title: 'Nueva operación'}}).onClose.subscribe(res => {
        this.onChangeGee(this.selectedGEE);
      });
    }
  }

  openFuelCard() {
    this.dialogService.open(NewFuelCardComponent, {context: {id_gee: this.selectedGEE.id}}).onClose.subscribe((newCard: FCard) => {
      if(newCard) {
        this.geeService.saveFCard(newCard).subscribe(() => {
          this.Toast.fire({
            icon: 'success',
            title: 'Tarjeta asociada correctamente.',
          } as SweetAlertOptions);
          this.getCards();
        });
      }
    });
  }

  openCRecord() {
    this.dialogService.open(NewCrecordComponent, {}).onClose.subscribe((newCrecord: CRecord) => {
      newCrecord.id_gee = this.selectedGEE.id;
      newCrecord.id_tarjeta = this.selectedCard.id;
      newCrecord.id_usuario = this.user.id;
      newCrecord.consumo_litros = null;
      newCrecord.recarga_litros = null;
      newCrecord.saldo_litros = null;
      newCrecord.sfinal_litros = null;
      newCrecord.sinicial_litros = null;
      if(this.card_records.length > 0) {
        newCrecord.sinicial_pesos = this.card_records[this.card_records.length - 1].sfinal_pesos;
      } else {
        newCrecord.sinicial_pesos = 0;
      }
      if(newCrecord.recarga_pesos) {
        newCrecord.saldo_pesos = newCrecord.sinicial_pesos + newCrecord.recarga_pesos;
        newCrecord.sfinal_pesos = newCrecord.saldo_pesos;
      }
      if(newCrecord.consumo_pesos) {
        newCrecord.sfinal_pesos = newCrecord.sinicial_pesos - newCrecord.consumo_pesos;
      }
      this.geeService.saveFCardRecord(newCrecord).subscribe(() => {
        this.Toast.fire({
          icon:'success',
          title: 'Registro guardado correctamente.',
        } as SweetAlertOptions);
        this.geeService.listCardsRecords(this.selectedCard.id).subscribe((records: CRecord[]) => {
          this.card_records = records;
        });
      });
    });
  }

  deleteCardRecord(cardRecord: CRecord){
    Swal.fire({
      title: 'Confirma que desea eliminar el registro?',
      text: 'Se eliminarán todos sus datos del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.geeService.deleteCardRecord(cardRecord.id).subscribe(() => {
          this.Toast.fire({
            icon:'success',
            title: 'Registro borrado correctamente.',
          } as SweetAlertOptions);
          this.geeService.listCardsRecords(this.selectedCard.id).subscribe((records: CRecord[]) => {
            this.card_records = records;
          });
        });
      }
    });
  }

}
