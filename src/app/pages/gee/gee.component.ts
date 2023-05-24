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
import { GeeTank } from '../../models/GeeTank';
import { EService } from '../../models/EService';
import { EserviceService } from '../../services/eservice.service';

@Component({
  selector: 'gee',
  templateUrl: './gee.component.html',
  styleUrls: ['./gee.component.css'],
})
export class GeeComponent implements OnInit {
  gees: GEE[] = [];
  cards: FCard[] = [];
  card_records: CRecord[] = [];
  geeTank: GeeTank[] = [];
  user = {id: 0};
  selectedGEE: GEE = {};
  grecords: GRecord[] = [];
  service: EService = {};
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 3000,
  });
  selectedCard: FCard = {};
  existencia_combustible_total: number = 0;

  constructor(private geeService: GeeService, private authService: NbAuthService, private dialogService: NbDialogService,
     private eService: EserviceService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.geeService.listGEEsByUser(this.user.id).subscribe((res: GEE[]) => {
        this.gees = res;
        if (this.gees.length > 0) {
          this.selectedGEE = this.gees[0];
          this.eService.getOne(this.selectedGEE.id_serv).subscribe((serv: EService) => {
            this.service = serv;
          });
          this.geeService.listGEERecords(this.selectedGEE.id).subscribe((grcords: GRecord[]) => {
            this.grecords = grcords;
          });
          this.getCards();
          this.getTanks();
          this.actualizar_existencia_combustible();
        }
      });
    });
  }

  actualizar_existencia_combustible() {
    this.geeService.getGEEFuelExistence(this.selectedGEE.id).subscribe((res: any) => {
      this.existencia_combustible_total = res.existencia;
      // console.log(this.existencia_combustible_total);
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

  getTanks() {
    this.geeService.listTanksByGEE(this.selectedGEE.id).subscribe((tanks: GeeTank[]) => {
      this.geeTank = tanks;
      // console.log(this.geeTank);
    });
  }

  onChangeGee(selected: GEE) {
    this.geeService.listGEERecords(selected.id).subscribe((grcords: GRecord[]) => {
      this.grecords = grcords;
      // console.log(this.grecords);
    });
    this.getCards();
    this.getTanks();
    this.actualizar_existencia_combustible();
    this.eService.getOne(this.selectedGEE.id_serv).subscribe((serv: EService) => {
      this.service = serv;
    });
  }

  onChangeCard(selected: FCard) {
    this.geeService.listCardsRecords(selected.id).subscribe((records: CRecord[]) => {
      this.card_records = records;
    });
  }

  openNew() {
    const contexto = {title: 'Nueva operación'};
    let op_anterior: GRecord;
    if (this.grecords.length > 0) {
      op_anterior = this.grecords[0];
    } else {
      op_anterior = null;
    }
    this.dialogService.open(NewGrecordComponent, {context: {title: 'Nueva operación', user: this.user, operacion_anterior: op_anterior, existencia_combustible: this.existencia_combustible_total, gee: this.selectedGEE, horario_diurno: this.service.horario_diurno}}).onClose.subscribe((nuevas_operaciones: any[]) => {
      if(nuevas_operaciones) {
        this.geeService.saveGEERecord(nuevas_operaciones).subscribe(() => {
          this.onChangeGee(this.selectedGEE);
          this.Toast.fire({
            icon: 'success',
            title: 'Registro creado correctamente.',
          } as SweetAlertOptions);
        });
      }
    });
  }

  openFuelCard() {
    this.dialogService.open(NewFuelCardComponent, {context: {id_gee: this.selectedGEE.id}}).onClose.subscribe((newCard: FCard) => {
      if(newCard) {
        newCard.id_usuario = this.user.id;
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
        this.getTanks();
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
