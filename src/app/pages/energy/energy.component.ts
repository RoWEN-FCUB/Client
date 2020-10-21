import { Component, OnInit } from '@angular/core';
import { ERecord } from '../../models/ERecord';
import { NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import 'moment/min/locales';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { EnergyService } from '../../services/energy.service';
import { NewErecordComponent } from '../new-erecord/new-erecord.component';
import { EnergyPlansComponent } from '../energy-plans/energy-plans.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { OwlDateTimeComponent, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';
import { Moment } from 'moment';
// const moment = (_moment as any).default ? (_moment as any).default : _moment;
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css'],
})
export class EnergyComponent implements OnInit {
  erecords: ERecord[];
  currentMonth: string;
  currentYear: string;
  totalPlan: number = 0;
  totalConsume: number = 0;
  promConsume: number = 0;
  selectedMonth: number;
  selectedYear: number;
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: ''};
  // opciones de la grafica
  showgraph: boolean = false;
  multi: any[] = [];
  view: any[] = [900, 250];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Días';
  showYAxisLabel = true;
  yAxisLabel = 'Consumo de energía (KW)';
  timeline = false;
  autoScale = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  // // //

  constructor(private energyService: EnergyService, private dialogService: NbDialogService, private authService: NbAuthService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.currentYear = moment().get('year').toString();
      this.currentMonth = moment().locale('es').format('MMMM');
      this.selectedYear = moment().get('year');
      this.selectedMonth = moment().get('month');
      this.generar_rango_inicial();
    });
  }

  onSelect(event) {
    // console.log(event);
    const i: number = Number(event.name) - 1;
    this.openNew(i);
  }

  toogleGraph() {
    this.showgraph = !this.showgraph;
  }

  chosenMonthHandler( normalizedMonth: Moment, datepicker: OwlDateTimeComponent<Moment> ) {
    // console.log(normalizedMonth);
    this.currentYear = moment(normalizedMonth).get('year').toString();
    this.currentMonth = moment(normalizedMonth).locale('es').format('MMMM');
    this.selectedYear = moment(normalizedMonth).get('year');
    this.selectedMonth = moment(normalizedMonth).get('month');
    datepicker.close();
    this.generar_rango_inicial();
  }

  deleteERecord(id: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    this.energyService.deleteERecord(id).subscribe(res => {
      Toast.fire({
        icon: 'success',
        title: 'Registro eliminado.',
      } as SweetAlertOptions);
      this.generar_rango_inicial();
    });
  }

  generar_rango_inicial() {
    this.totalPlan = 0;
    this.totalConsume = 0;
    this.erecords = [];
    let fday = moment().set('year', this.selectedYear).set('month', this.selectedMonth).startOf('month').toDate();
    // fday.setTime(fday.getTime() + fday.getTimezoneOffset() * 60 * 1000);
    const lday = moment().set('year', this.selectedYear).set('month', this.selectedMonth).endOf('month').toDate();
    while (moment(fday).isSameOrBefore(lday, 'day')) {
      const erecord: ERecord = {
        fecha: fday,
        plan: 0,
        consumo: 0,
        lectura: 0,
        planacumulado: 0,
        realacumulado: 0,
      };
      this.erecords.push(erecord);
      fday = moment(fday).locale('es').add(1, 'days').toDate();
    }
    this.energyService.getERecords(this.selectedYear, this.selectedMonth + 1).subscribe((res: ERecord[]) => {
      // console.log(res);
      // console.log(this.erecords);
      let last = 0;
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < this.erecords.length; j++) {
          if (moment.utc(res[i].fecha).isSame(this.erecords[j].fecha, 'day')) {
            this.erecords[j] = res[i];
            this.erecords[j].planacumulado = 0;
            this.erecords[j].realacumulado = 0;
            break;
          }
        }
      }
      // console.log(this.erecords);
      for (let i = 0; i < this.erecords.length; i++) {
        this.totalConsume += this.erecords[i].consumo;
        this.totalPlan += this.erecords[i].plan;
        this.erecords[i].realacumulado = this.erecords[i].consumo + this.erecords[last].realacumulado;
        this.erecords[i].planacumulado = this.erecords[i].plan + this.erecords[last].planacumulado;
        if (this.erecords[i].lectura) {
          last = i;
        }
      }
      const consumos = [];
      const planes = [];
      for (let i = 0; i < this.erecords.length; i++) {
        if (this.erecords[i].consumo > 0) {
          consumos.push({name : (i + 1).toString(), value : this.erecords[i].consumo});
        }
        if (this.erecords[i].plan > 0) {
          planes.push({name : (i + 1).toString(), value : this.erecords[i].plan});
        }
      }
      if (consumos.length > 0) {
        this.promConsume = Math.round(this.totalConsume / consumos.length);
      }
      // tslint:disable-next-line: max-line-length
      this.multi = [{name: 'Plan ' + this.totalPlan + ' KW', series: planes}, {name: 'Consumo ' + this.totalConsume + ' KW', series: consumos}];
    });
  }

  openNew(i: number) {
    let prev: number = 0;
    // OBTENER LA LECTURA DEL DIA ANTERIOR
    // tslint:disable-next-line: max-line-length
    this.energyService.getEReading(moment.utc(this.erecords[i].fecha).format('YYYY-MM-DD')).subscribe((res: ERecord[]) => {
      if (res.length > 0) {
        prev = res[0].lectura;
      }
      // tslint:disable-next-line: max-line-length
      const newe = Object.assign({}, this.erecords[i]);
      this.dialogService.open(NewErecordComponent, {context: {newERecord: newe, prev_reading: prev}}).onClose.subscribe(
        (newWRecord: ERecord) => {
          if (newWRecord) {
            this.generar_rango_inicial();
            this.consume_adjust();
          }
        },
      );
    });
  }

  openPlans() {
    this.dialogService.open(EnergyPlansComponent).onClose.subscribe(
      (newWRecord: ERecord) => {
        if (newWRecord) {
          this.generar_rango_inicial();
        }
      },
    );
  }

  consume_adjust() { // AJUSTA LOS CONSUMOS POR SI CAMBIO ALGUNA LECTURA INTERMEDIA
    let last = 0;
    this.totalConsume = 0;
    this.totalPlan = 0;
    let prev: number = 0;
    const bd_update: ERecord[] = [];
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    // tslint:disable-next-line: max-line-length
    this.energyService.getEReading(moment.utc(this.erecords[0].fecha).format('YYYY-MM-DD')).subscribe((res: ERecord[]) => {
      if (res.length > 0) {
        prev = res[0].lectura;
      }
      for (let i = 0; i < this.erecords.length; i++) {
        if (i === 0) {
          this.erecords[i].realacumulado = 0;
          this.erecords[i].planacumulado = 0;
          if (this.erecords[i].id) {
            this.erecords[i].consumo = this.erecords[i].lectura - prev;
          } else {
            this.erecords[i].consumo = 0;
          }
        } else {
          if (this.erecords[i].id) {
            this.erecords[i].consumo = this.erecords[i].lectura - this.erecords[last].lectura;
          } else {
            this.erecords[i].consumo = 0;
          }
        }
        this.totalConsume += this.erecords[i].consumo;
        this.totalPlan += this.erecords[i].plan;
        this.erecords[i].realacumulado = this.erecords[i].consumo + this.erecords[last].realacumulado;
        this.erecords[i].planacumulado = this.erecords[i].plan + this.erecords[last].planacumulado;
        if (this.erecords[i].lectura) {
          last = i;
          bd_update.push(this.erecords[i]);
        }
      }
      // console.log(bd_update);
      this.energyService.updateAllERecord(bd_update).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Registro actualizado.',
        } as SweetAlertOptions);
      });
    });
  }

  export() {
    const table_to_print = []; // tabla final a imprimir
    // tslint:disable-next-line: max-line-length
    const head = [
      '',
      'Día',
      'Plan',
      'Real',
      'Plan acumulado',
      'Real acumulado',
      'Lectura']; // cada fila
    table_to_print.push(head);
    for (let i = 0; i < this.erecords.length; i++) {
      // tslint:disable-next-line: max-line-length
      const dia = moment.utc(this.erecords[i].fecha).locale('es').format('dddd').toUpperCase();
      let bgcolor = '';
      if  (dia === 'SÁBADO' || dia === 'DOMINGO') {
        bgcolor = '#CCCCCC';
      }
      const row = [
        {text: dia, fillColor: bgcolor},
        {text: (i + 1).toString(), fillColor: bgcolor},
        {text: (this.erecords[i].plan > 0) ? this.erecords[i].plan.toString() : '', fillColor: bgcolor},
        {text: (this.erecords[i].consumo > 0) ? this.erecords[i].consumo.toString() : '', fillColor: bgcolor},
        {text: this.erecords[i].planacumulado.toString(), fillColor: bgcolor},
        {text: this.erecords[i].realacumulado.toString(), fillColor: bgcolor},
        {text: (this.erecords[i].lectura > 0) ? this.erecords[i].lectura.toString() : '', fillColor: bgcolor}];
      table_to_print.push(row);
    }
    const docDefinition = {
      info: {
        title: 'Consumo de energía de ' + this.currentMonth + ' del ' + this.currentYear,
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
      // pageOrientation: 'landscape',
      content: [
        {
          text: 'Desglose Plan de Energía CITMATEL ' + this.currentYear, fontSize: 15, width: 'auto',
        },
        {
          text: 'Plan para el mes de ' + this.currentMonth + ' ' + this.totalPlan + ' KW', fontSize: 15, width: 'auto',
        },
        {
          table: {
            widths: [70, 50, 50, 50, 90, 90, 70],
            body: table_to_print,
            fontSize: 12,
          },
          layout: {
            paddingLeft: function(i, node) { return 3; },
            paddingRight: function(i, node) { return 3; },
            paddingTop: function(i, node) { return 1; },
            paddingBottom: function(i, node) { return 1; },
            hLineWidth: function (i, node) {
              return (i < 2 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i < 2 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
          },
        },
        {
          table: {
            body: [{text: ' '}],
            heights: [100],
          },
        },
        {
          text: 'Elaborado por:_______________________________________________________', fontSize: 12, width: 'auto',
        },
      ],
      pageMargins: [25, 35, 15, 5],
    };
    pdfMake.createPdf(docDefinition).download('Control de energía de ' + this.currentMonth + ' del ' + this.currentYear);
  }

}
