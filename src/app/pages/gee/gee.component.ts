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
import { firstValueFrom } from 'rxjs';

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
  config = {
    id: 'grecords',
    itemsPerPage: 3,
    currentPage: 1,
    totalItems: 0,
  };
  config2 = {
    id: 'crecords',
    itemsPerPage: 3,
    currentPage: 1,
    totalItems: 0,
  };
  config3 = {
    id: 'trecords',
    itemsPerPage: 3,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private geeService: GeeService, private authService: NbAuthService, private dialogService: NbDialogService,
     private eService: EserviceService) { }

  async ngOnInit() {
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.geeService.listGEEsByUser(this.user.id).subscribe(async (res: GEE[]) => {
        this.gees = res;
        if (this.gees.length > 0) {
          this.selectedGEE = this.gees[0];
          this.eService.getOne(this.selectedGEE.id_serv).subscribe((serv: EService) => {
            this.service = serv;
          });
          await this.getGRecords().then(async res=> {
            await this.getCards().then(async res => {
              await this.getTanks().then(async res => {
                this.actualizar_existencia_combustible();
              });
            });
          });
        }
      });
    });
  }

  async ajustarExistencia() {
    
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.getGRecords();
  }

  pageChanged2(event) {
    this.config2.currentPage = event;
    this.getCardsRecords();
  }

  pageChanged3(event) {
    this.config3.currentPage = event;
    this.getTanks();
  }

  actualizar_existencia_combustible() {
    /*this.geeService.getGEEFuelExistence(this.selectedGEE.id).subscribe((res: any) => {
      this.existencia_combustible_total = res.existencia;
      // console.log(this.existencia_combustible_total);
    });*/
    this.existencia_combustible_total = 0;
    //console.log(this.cards);
    //console.log(this.geeTank);
    for (let i = 0; i < this.cards.length; i++) {
      this.existencia_combustible_total += this.round(this.cards[i].saldo / this.cards[i].precio_combustible , 2);
    }
    if (this.geeTank.length > 0) {
      this.existencia_combustible_total += this.geeTank[0].existencia;
    }
    this.existencia_combustible_total = this.round(this.existencia_combustible_total, 2);
    //console.log(this.existencia_combustible_total);
  }

  async getGRecords() :Promise<any> {
    //console.log(1);
    const resp: any = await this.geeService.listGEERecords(this.selectedGEE.id, this.config.currentPage, this.config.itemsPerPage).then((res: {records: GRecord[], total_items: number}) => {
      //console.log(2);
      this.grecords = res.records;
      this.config.totalItems = res.total_items;
    });
    return resp;
    /*this.geeService.listGEERecords(this.selectedGEE.id, this.config.currentPage, this.config.itemsPerPage).subscribe((res: {records: GRecord[], total_items: number}) => {
      console.log(2);
      this.grecords = res.records;
      this.config.totalItems = res.total_items;
    });*/
  }

  async getCardsRecords() :Promise<any> {
    const resp: any = await this.geeService.listCardsRecords(this.selectedCard.id, this.config2.currentPage, this.config2.itemsPerPage).then((res: {records: CRecord[], total_items: number}) => {
      this.card_records = res.records;
      this.config2.totalItems = res.total_items;
    });
    return resp;
    /*
    this.geeService.listCardsRecords(this.selectedCard.id, this.config2.currentPage, this.config2.itemsPerPage).subscribe((res: {records: CRecord[], total_items: number}) => {
      this.card_records = res.records;
      this.config2.totalItems = res.total_items;
    });*/
  }

  async getCards() :Promise<any> {
    //console.log(3);
    const resp: any = await this.geeService.listCardsByGEE(this.selectedGEE.id).then(async (cards: FCard[]) => {
      //console.log(4);
      this.cards = cards;
      if (this.cards.length > 0) {
        this.selectedCard = this.cards[0];
        await this.getCardsRecords();
      }
    });
    return resp;
    /*
    this.geeService.listCardsByGEE(this.selectedGEE.id).subscribe((cards: FCard[]) => {
      console.log(4);
      this.cards = cards;
      if (this.cards.length > 0) {
        this.selectedCard = this.cards[0];
        this.getCardsRecords();
      }
    });*/
  }

  async getTanks() :Promise<any>{
    //console.log(5);
    const resp: any = await this.geeService.listTanksByGEE(this.selectedGEE.id, this.config3.currentPage, this.config3.itemsPerPage).then((res: {records: GeeTank[], total_items: number}) => {
      //console.log(6);
      this.geeTank = res.records;
      this.config3.totalItems = res.total_items;
      // console.log(this.geeTank);
    });
    return resp;
    /*
    this.geeService.listTanksByGEE(this.selectedGEE.id, this.config3.currentPage, this.config3.itemsPerPage).subscribe((res: {records: GeeTank[], total_items: number}) => {
      console.log(6);
      this.geeTank = res.records;
      this.config3.totalItems = res.total_items;
      // console.log(this.geeTank);
    });*/
  }

  async onChangeGee(selected: GEE) {
    await this.getGRecords().then(async res=> {
      await this.getCards().then(async res => {
        await this.getTanks().then(async res => {
          this.actualizar_existencia_combustible();
        });
      });
    });
    this.eService.getOne(this.selectedGEE.id_serv).subscribe((serv: EService) => {
      this.service = serv;
    });
  }

  onChangeCard(selected: FCard) {
    this.config2.currentPage = 1;
    this.getCardsRecords();
  }

  openNewGRecord() {
    //console.log(this.existencia_combustible_total);
    let op_anterior: GRecord;
    if (this.grecords.length > 0) {
      op_anterior = this.grecords[0];
    } else {
      op_anterior = {};
    }
    this.dialogService.open(NewGrecordComponent, {context: {title: 'Nueva operación', user: this.user, operacion_anterior: op_anterior, existencia_combustible: this.existencia_combustible_total, gee: this.selectedGEE, horario_diurno: this.service.horario_diurno}}).onClose.subscribe((nuevas_operaciones: any[]) => {
      if(nuevas_operaciones) {
        this.geeService.saveGEERecord(nuevas_operaciones).subscribe(async () => {
          await this.getGRecords().then(async res=> {
            await this.getCards().then(async res => {
              await this.getTanks().then(async res => {
                this.actualizar_existencia_combustible();
              });
            });
          });
          this.Toast.fire({
            icon: 'success',
            title: 'Registro creado correctamente.',
          } as SweetAlertOptions);
        });
      }
    });
  }

  openEditGRecord(geeRecord: GRecord) {
    this.dialogService.open(NewGrecordComponent, {context: {title: 'Editar operación', user: this.user, nueva_operacion: Object.assign({}, geeRecord), existencia_combustible: this.existencia_combustible_total, gee: this.selectedGEE, horario_diurno: this.service.horario_diurno}}).onClose.subscribe(async (nuevas_operaciones: any[]) => {
      if (nuevas_operaciones) {
        await this.deleteGEERecord(geeRecord);
        this.geeService.saveGEERecord(nuevas_operaciones).subscribe(async () => {
          await this.getGRecords().then(async res=> {
            await this.getCards().then(async res => {
              await this.getTanks().then(async res => {
                this.actualizar_existencia_combustible();
              });
            });
          });
          this.Toast.fire({
            icon: 'success',
            title: 'Registro actualizado correctamente.',
          } as SweetAlertOptions);
        });
      }
    });
  }

  openFuelCard() {
    this.dialogService.open(NewFuelCardComponent, {context: {id_gee: this.selectedGEE.id}}).onClose.subscribe((newCard: FCard) => {
      if(newCard) {
        newCard.id_usuario = this.user.id;
        this.geeService.saveFCard(newCard).subscribe(async () => {
          this.Toast.fire({
            icon: 'success',
            title: 'Tarjeta asociada correctamente.',
          } as SweetAlertOptions);
          await this.getCards().then(res => {
            this.actualizar_existencia_combustible();
          });
        });
      }
    });
  }

  openCRecord() {
    let saldo: number = 0;
    if (this.card_records.length > 0) {
      saldo = this.card_records[0].sfinal_pesos;
    }
    this.dialogService.open(NewCrecordComponent, {context: {saldo: saldo}}).onClose.subscribe((newCrecord: CRecord) => {
      if(newCrecord) {
        newCrecord.id_gee = this.selectedGEE.id;
        newCrecord.id_tarjeta = this.selectedCard.id;
        newCrecord.id_usuario = this.user.id;
        newCrecord.consumo_litros = null;
        newCrecord.recarga_litros = null;
        newCrecord.saldo_litros = null;
        newCrecord.sfinal_litros = null;
        newCrecord.sinicial_litros = null;
        if(this.card_records.length > 0) {
          newCrecord.sinicial_pesos = this.card_records[0].sfinal_pesos;
        } else {
          newCrecord.sinicial_pesos = 0;
        }
        newCrecord.sinicial_litros = this.round(newCrecord.sinicial_pesos / this.selectedCard.precio_combustible, 2);
        if(newCrecord.recarga_pesos) {
          newCrecord.saldo_pesos = newCrecord.sinicial_pesos + newCrecord.recarga_pesos;
          newCrecord.saldo_litros = this.round(newCrecord.saldo_pesos / this.selectedCard.precio_combustible, 2);
          newCrecord.sfinal_pesos = newCrecord.saldo_pesos;
          newCrecord.sfinal_litros = this.round(newCrecord.sfinal_pesos / this.selectedCard.precio_combustible, 2);
          newCrecord.recarga_litros = this.round(newCrecord.recarga_pesos / this.selectedCard.precio_combustible, 2);
        }
        if(newCrecord.consumo_pesos) {
          newCrecord.sfinal_pesos = newCrecord.sinicial_pesos - newCrecord.consumo_pesos;
          newCrecord.sfinal_litros = this.round(newCrecord.sfinal_pesos / this.selectedCard.precio_combustible, 2);
          newCrecord.consumo_litros = this.round(newCrecord.consumo_pesos / this.selectedCard.precio_combustible, 2);
        }
        this.geeService.saveFCardRecord(newCrecord).subscribe(async () => {
          this.Toast.fire({
            icon:'success',
            title: 'Registro guardado correctamente.',
          } as SweetAlertOptions);
          await this.getCards().then(async res => {
            await this.getTanks().then(async res => {
              this.actualizar_existencia_combustible();
            });
          });                    
        });
      }
    });
  }

  round(numb: number, precision: number) {
    const exp: number = Math.pow(10, precision);
    return Math.round( ( numb + Number.EPSILON ) * exp ) / exp;
  }

  deleteCardRecord(cardRecord: CRecord) {
    Swal.fire({
      title: 'Confirma que desea eliminar la operación?',
      text: 'Se eliminarán todos sus datos del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.geeService.deleteCardRecord(cardRecord.id).subscribe(async () => {
          this.Toast.fire({
            icon:'success',
            title: 'Operación eliminada correctamente.',
          } as SweetAlertOptions);
          await this.getCards().then(async res => {
            await this.getTanks().then(async res => {
              this.actualizar_existencia_combustible();
            });
          });
        });
      }
    });
  }

  async deleteGEERecord(geeRecord: GRecord, showMessage?: boolean) : Promise<any> {
    if (showMessage) {
      Swal.fire({
        title: 'Confirma que desea eliminar la operación?',
        text: 'Se eliminarán todos sus datos del sistema.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí­',
        cancelButtonText: 'No',
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          this.geeService.deleteGEERecord(geeRecord.id).subscribe(async () => {
            this.Toast.fire({
              icon:'success',
              title: 'Operación eliminada correctamente.',
            } as SweetAlertOptions);
            await this.getGRecords().then(async result => {
              await this.getTanks().then(async result => {
                this.actualizar_existencia_combustible();
                return null;
              });
            });
          });
        }
        return null;
      });
    } else {
      return await firstValueFrom(this.geeService.deleteGEERecord(geeRecord.id));
    }
  }

}
