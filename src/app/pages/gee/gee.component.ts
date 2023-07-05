import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { AdjustFuelComponent } from '../adjust-fuel/adjust-fuel.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import NP from 'number-precision';

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
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  config2 = {
    id: 'crecords',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  config3 = {
    id: 'trecords',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  @ViewChild('rangodias', {static: false}) rangodias: ElementRef;

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

  exportGEERecords(records: GRecord[]) {
    let table_to_print: any = [
      [{text: 'D', rowSpan: 2}, {text: 'M', rowSpan: 2}, {text: 'A', rowSpan: 2}, {text: 'TIPO', rowSpan: 2}, {text: 'HORA', colSpan: 2, alignment: 'center'}, {text: ''},
      {text: 'HORAMETRO', colSpan: 2, alignment: 'center'}, {text: ''}, {text: 'TIEMPO TRABAJADO', rowSpan: 2}, {text: 'ENERGIA GENERADA', rowSpan: 2}, {text: 'COMBUSTIBLE', colSpan: 2, alignment: 'center'}, {text: ''},
      {text: 'OBSERVACIONES', rowSpan: 2}, {text: 'FIRMA DEL SUPERVISOR', rowSpan: 2}
      ], 
      ['', '', '', '', {text:'INICIAL'}, {text:'FINAL'}, {text:'INICIAL'}, {text:'FINAL'}, {text:''}, {text:''}, {text:'CONSUMIDO'}, {text:'EXISTENCIA'}, {text:''}, {text:''}]
    ];
    let energia_generada: number = 0;
    let combustible_consumido: number = 0;
    let tiempo_trabajado: number = 0;
    for(let i = 0; i < records.length; i++) {
      const newrow: any =  [{text: records[i].D}, {text:records[i].M}, {text:records[i].A}, {text:records[i].tipo}, {text: String(records[i].hora_inicial).substring(0,5)},
        {text:String(records[i].hora_final).substring(0,5)}, {text:records[i].horametro_inicial.toFixed(1), alignment: 'right'}, {text:records[i].horametro_final.toFixed(1), alignment: 'right'}, {text:records[i].tiempo_trabajado.toFixed(1), alignment: 'right'},
        {text:records[i].energia_generada.toFixed(2), alignment: 'right'}, {text:records[i].combustible_consumido.toFixed(2), alignment: 'right'}, {text:records[i].combustible_existencia.toFixed(2), alignment: 'right'},
        {text:records[i].observaciones}, {text:''}
      ];
      energia_generada += records[i].energia_generada;
      combustible_consumido += records[i].combustible_consumido;
      tiempo_trabajado += records[i].tiempo_trabajado;
      table_to_print.push(newrow);
    }
    const total: any =  [{text: 'T', bold: true}, '', '', '', '','', '', '', {text: tiempo_trabajado.toFixed(1), alignment: 'right', bold: true}, {text: energia_generada.toFixed(2), alignment: 'right', bold: true}, {text: combustible_consumido.toFixed(2), alignment: 'right', bold: true}, '','', ''];
    table_to_print.push(total);
    const docDefinition = {
      info: {
        title: 'Registro de operaciones del ' + this.selectedGEE.idgee
      },
      footer: function(currentPage, pageCount) {
        return {
          text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
          alignment: 'right',
          margin: [2, 2, 5, 2],
          fontSize: 10,
        };
      },
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      content: [
        {
          text: 'REGISTRO DE OPERACIONES', fontSize: 15, width: 'auto', alignment: 'center', bold: true,
        },
        {
          text: 'DATOS DEL GEE', fontSize: 15, width: 'auto', alignment: 'center', bold: true,
        },
        {
          columns: [
            {columns: [{text: 'PROVINCIA: ', width: 'auto'}, {text: this.selectedGEE.provincia, decoration: 'underline', width: '*'}], columnGap: 5, width: '*'}, {columns: [{text: 'MUNICIPIO: ', width: 'auto'}, {text: this.selectedGEE.municipio, decoration: 'underline', width: '*'}], columnGap: 5, width: '*'},
            {columns: [{text: 'ORGANISMO: ', width: 'auto'}, {text: this.selectedGEE.oace, decoration: 'underline', width: '*'}], columnGap: 5, width: '*'}, {columns: [{text: 'EMPRESA: ', width: 'auto'}, {text: this.selectedGEE.empresa, decoration: 'underline', width: '*'}], columnGap: 5, width: '*'}
          ],
          columnGap: 10
        },
        {
          columns: [
            {columns: [{text: 'ENTIDAD U OBJETIVO: ', width: '*'}, {text: this.selectedGEE.servicio, decoration: 'underline', width: '*'}], columnGap: 5, width: 'auto'}, {columns: [{text: 'MARCA: ', width: 'auto'}, {text: this.selectedGEE.marca, decoration: 'underline', width: '*'}], columnGap: 5, width: '*'},
            {columns: [{text: 'KVA: ', width: 'auto'}, {text: this.selectedGEE.kva, decoration: 'underline', width: '*'}], columnGap: 5, width: '*'}, {columns: [{text: 'IDGEE: ', width: 'auto'}, {text: this.selectedGEE.idgee, decoration: 'underline', width: '*'}], columnGap: 5, width: '*'}
          ],
          columnGap: 10
        },
        {
          table: {
            headerRows: 2,
            body: table_to_print,
            fontSize: 12,
          }
        }
      ],
      pageMargins: [15, 15, 15, 5],
    };
    pdfMake.createPdf(docDefinition).download('Registro de operaciones del ' + this.selectedGEE.idgee);
  }

  exportCardRecords(){
    let table_to_print: any = [
      [{text: 'CONTROL COMBUSTIBLE GEE', alignment: 'center', bold: true, colSpan: 6}, '', '', '', '', ''],
      [{text: [{text: 'Empresa: '}, {text: this.selectedGEE.servicio, decoration: 'underline'}], colSpan: 4}, '', '', '', {text: [{text: 'Organismo: '}, {text: this.selectedGEE.oace, decoration: 'underline'}], colSpan: 2}, ''],
      [{text: 'CONTROL DE TARJETAS MAGNÉTICAS DE COMBUSTIBLE', colSpan: 6, width: 'auto', alignment: 'center', bold: true,}, '', '', '', '', ''],
      [{text: [{text: 'Tarjeta No.: '}, {text: this.selectedCard.numero, decoration: 'underline', width: '*'}], colSpan: 3}, '','', {text: [{text: 'Tipo de combustible: ', width: '*'}, {text: this.selectedCard.nombre_combustible, decoration: 'underline', width: '*'}], colSpan: 3}, '', ''],
      [{text: 'Fecha', alignment: 'center'}, {text: 'Saldo Inicial Pesos/Litros', alignment: 'center'}, {text: 'Recarga Pesos/Litros', alignment: 'center'}, {text: 'Saldo Pesos/Litros', alignment: 'center'}, {text: 'Consumo Pesos/Litros', alignment: 'center'}, {text: 'Saldo Final Pesos/Litros', alignment: 'center'}]
    ];
    let recarga_saldo: number = 0;
    let recarga_litros: number = 0;
    let consumo_saldo: number = 0;
    let consumo_litros: number = 0;
    for(let i = this.card_records.length - 1; i > -1; i--) {
      const newrow =  [
        moment(this.card_records[i].fecha).utc().format('DD-MM-yyyy'),
        this.card_records[i].sinicial_pesos ? {text: this.card_records[i].sinicial_pesos + ' / ' + this.card_records[i].sinicial_litros, alignment: 'center'} : {text:'--', alignment: 'center'},
        this.card_records[i].recarga_pesos ? {text: this.card_records[i].recarga_pesos + ' / ' + this.card_records[i].recarga_litros, alignment: 'center'} : {text:'--', alignment: 'center'},
        this.card_records[i].saldo_pesos ? {text: this.card_records[i].saldo_pesos + ' / ' + this.card_records[i].saldo_litros, alignment: 'center'} : {text:'--', alignment: 'center'},
        this.card_records[i].consumo_pesos ? {text: this.card_records[i].consumo_pesos + ' / ' + this.card_records[i].consumo_litros, alignment: 'center'} : {text:'--', alignment: 'center'},
        this.card_records[i].sfinal_pesos ? {text: this.card_records[i].sfinal_pesos + ' / ' + this.card_records[i].sfinal_litros, alignment: 'center'} : {text:'--', alignment: 'center'},
      ];
      recarga_saldo += this.card_records[i].recarga_pesos;
      recarga_litros += this.card_records[i].recarga_litros;
      consumo_saldo += this.card_records[i].consumo_pesos;
      consumo_litros += this.card_records[i].consumo_litros;
      table_to_print.push(newrow);
    }
    const newrow =  [
      {text: 'T', bold: true},'', {text: recarga_saldo + ' / ' + recarga_litros, bold: true, alignment: 'center'},'', {text: consumo_saldo + ' / ' + consumo_litros, bold: true, alignment: 'center'},''
    ];
    table_to_print.push(newrow);
    const docDefinition = {
      info: {
        title: 'Registro de operaciones de la tarjeta ' + this.selectedCard.numero
      },
      footer: function(currentPage, pageCount) {
        return {
          text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
          alignment: 'right',
          margin: [2, 2, 5, 2],
          fontSize: 10,
        };
      },
      pageSize: 'LETTER',
      //pageOrientation: 'landscape',
      content: [        
        {
          table: {
            headerRows: 2,
            body: table_to_print,
            fontSize: 12,
          }
        }
      ],
      pageMargins: [15, 15, 15, 5],
    };
    pdfMake.createPdf(docDefinition).download('Registro de operaciones de la tarjeta ' + this.selectedCard.numero);
  }

  clickShowRange() {
    const picked_range: HTMLElement = this.rangodias.nativeElement;
    picked_range.click();
  }

  cambiarRango(e) {
    if (e.start && e.end) {
     this.geeService.listGEERecordsByDate(this.selectedGEE.id, moment(e.start).format('yyyy-MM-DD'), moment(e.end).format('yyyy-MM-DD')).subscribe((records:  GRecord[]) => {
        if(records.length > 0) {
          this.exportGEERecords(records);
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'El período seleccionado no tiene operaciones registradas.',
          } as SweetAlertOptions);
        }
      });
    }
  }

  async ajustarExistencia() {
    let tank: GeeTank = {};
    if (this.geeTank.length > 0) {
      tank = this.geeTank[0];
    } else {
      tank.id_gee = this.selectedGEE.id;
      tank.existencia = 0;
    }
    this.dialogService.open(AdjustFuelComponent, {context: {tank: Object.assign({}, tank)}}).onClose.subscribe((res: GeeTank) => {
      if(res) {
        res.id_usuario = this.user.id;
        delete res.id;
        this.geeService.adjustFuelExistence(res).subscribe(async resp => {
          this.Toast.fire({
            icon: 'success',
            title: 'Registro creado correctamente.',
          } as SweetAlertOptions);
          await this.getTanks().then(async res => {
            this.actualizar_existencia_combustible();
          });
        });
      }
    });
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
    this.existencia_combustible_total = 0;
    for (let i = 0; i < this.cards.length; i++) {
      this.existencia_combustible_total += NP.round(this.cards[i].saldo / this.cards[i].precio_combustible , 2);
    }
    if (this.geeTank.length > 0) {
      this.existencia_combustible_total += this.geeTank[0].existencia;
    }
    this.existencia_combustible_total = NP.round(this.existencia_combustible_total, 2);
  }

  async getGRecords() :Promise<any> {
    const resp: any = await this.geeService.listGEERecords(this.selectedGEE.id, this.config.currentPage, this.config.itemsPerPage).then((res: {records: GRecord[], total_items: number}) => {
     this.grecords = res.records;
      this.config.totalItems = res.total_items;
    });
    return resp;
  }

  async getCardsRecords() :Promise<any> {
    const resp: any = await this.geeService.listCardsRecords(this.selectedCard.id, this.config2.currentPage, this.config2.itemsPerPage).then((res: {records: CRecord[], total_items: number}) => {
      this.card_records = res.records;
      this.config2.totalItems = res.total_items;
    });
    return resp;
  }

  async getCards() :Promise<any> {
    const resp: any = await this.geeService.listCardsByGEE(this.selectedGEE.id).then(async (cards: FCard[]) => {
      this.cards = cards;
      if (!this.selectedCard.id) {
        if (this.cards.length > 0) {
          this.selectedCard = this.cards[0];
          await this.getCardsRecords();
        }
      } else {
        for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].id === this.selectedCard.id) {
            this.selectedCard = this.cards[i];
            break;
          }
        }
        await this.getCardsRecords();
      }
    });
    return resp;
  }

  async getTanks() :Promise<any>{
    const resp: any = await this.geeService.listTanksByGEE(this.selectedGEE.id, this.config3.currentPage, this.config3.itemsPerPage).then((res: {records: GeeTank[], total_items: number}) => {
     this.geeTank = res.records;
      this.config3.totalItems = res.total_items;
    });
    return resp;
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
    const saldo: number = this.selectedCard.saldo;
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
        newCrecord.sinicial_pesos = this.selectedCard.saldo;
        newCrecord.sinicial_litros = NP.round(newCrecord.sinicial_pesos / this.selectedCard.precio_combustible, 2);
        if(newCrecord.recarga_pesos) {
          newCrecord.saldo_pesos = newCrecord.sinicial_pesos + newCrecord.recarga_pesos;
          newCrecord.saldo_litros = NP.round(newCrecord.saldo_pesos / this.selectedCard.precio_combustible, 2);
          newCrecord.sfinal_pesos = newCrecord.saldo_pesos;
          newCrecord.sfinal_litros = NP.round(newCrecord.sfinal_pesos / this.selectedCard.precio_combustible, 2);
          newCrecord.recarga_litros = NP.round(newCrecord.recarga_pesos / this.selectedCard.precio_combustible, 2);
        }
        if(newCrecord.consumo_pesos) {
          newCrecord.sfinal_pesos = newCrecord.sinicial_pesos - newCrecord.consumo_pesos;
          newCrecord.sfinal_litros = NP.round(newCrecord.sfinal_pesos / this.selectedCard.precio_combustible, 2);
          newCrecord.consumo_litros = NP.round(newCrecord.consumo_pesos / this.selectedCard.precio_combustible, 2);
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

  /*round(numb: number, precision: number) {
    const exp: number = Math.pow(10, precision);
    return Math.round( ( numb + Number.EPSILON ) * exp ) / exp;
  }*/

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
