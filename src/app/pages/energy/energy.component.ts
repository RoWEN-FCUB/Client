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
import { Workbook } from 'exceljs';
import * as fsaver from 'file-saver';
import ipserver from '../../ipserver';
import {HttpClient} from '@angular/common/http';

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
  public totalPlan: number = 0;
  totalConsume: number = 0;
  totalYearPlan: number = 0;
  totalYearConsume: number = 0;
  promConsume: number = 0;
  selectedMonth: number;
  selectedYear: number;
  show: boolean = false;
  showstring: string[] = ['mes', 'año'];
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: ''};
  months: {Mes: number, Plan: number, Consumo: number, PlanAcumulado?: number, RealAcumulado?: number}[] = [];
  // opciones de la grafica
  showgraph: boolean = false;
  multi: any[] = [];
  multi2: any[] = [];
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
  autoScale = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  yscaleMax = 100;
  yscaleMax2 = 1000;
  // // //

  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private energyService: EnergyService, private dialogService: NbDialogService, private authService: NbAuthService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.currentYear = moment().get('year').toString();
      this.currentMonth = moment().locale('es').format('MMMM');
      this.selectedYear = moment().get('year');
      this.selectedMonth = moment().get('month');
      this.generar_rango_inicial(false);
      this.consumo_por_meses();
    });
  }

  async exportLocalXlsx(index: number) {
    const workBook: Workbook = new Workbook();
    const subscription = this.http.get('./assets/Modelo5.xlsx', { responseType: 'blob' })
    .subscribe(value => {
    const blob: Blob = value;
    const reader = new FileReader();
    const tplan = this.totalPlan;
    const ac_plan = this.erecords[index].planacumulado;
    const ac_real = this.erecords[index].realacumulado;
    const d_plan = this.erecords[index].plan;
    const d_real = this.erecords[index].consumo;
    const pplan = this.erecords[index].plan_hpic;
    const preal = this.erecords[index].real_hpic;
    const edate = moment(this.erecords[index].fecha.toString().substr(0, this.erecords[index].fecha.toString().indexOf('T'))).format('DD-MM-YYYY');
    // tslint:disable-next-line: max-line-length
    const fdate = moment(this.erecords[index].fecha.toString().substr(0, this.erecords[index].fecha.toString().indexOf('T'))).locale('es').format('DD/MM/YYYY');
    const month = moment(this.erecords[index].fecha).locale('es').format('MMMM').toUpperCase();
    reader.onload = function (e: any) {
      const contents = e.target.result;
      workBook.xlsx.load(contents).then(data => {
        workBook.worksheets[0].getCell(1, 6).value = month;
        workBook.worksheets[0].getCell(1, 8).value = fdate;
        workBook.worksheets[0].getCell(3, 14).value = tplan;
        workBook.worksheets[0].getCell(3, 15).value = ac_plan;
        workBook.worksheets[0].getCell(3, 16).value = ac_real;
        workBook.worksheets[0].getCell(3, 17).model.result = undefined; // para que recalcule las formulas
        workBook.worksheets[0].getCell(3, 18).model.result = undefined;
        workBook.worksheets[0].getCell(3, 19).value = d_plan;
        workBook.worksheets[0].getCell(3, 20).value = d_real;
        workBook.worksheets[0].getCell(3, 21).model.result = undefined;
        workBook.worksheets[0].getCell(3, 22).model.result = undefined;
        workBook.worksheets[0].getCell(3, 26).value = pplan;
        workBook.worksheets[0].getCell(3, 27).value = preal;
        workBook.worksheets[0].getCell(3, 28).model.result = undefined;
        workBook.worksheets[0].getCell(3, 29).model.result = undefined;
        workBook.xlsx.writeBuffer().then(data1 => {
          const blobUpdate = new Blob([data1], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fsaver.saveAs(blobUpdate, 'Modelo 5 DST Las Tunas ' + edate + '.xlsx');
        });
      });
    };
    reader.readAsArrayBuffer(blob);
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

  toogleShow(event) {
    this.show = !this.show;
  }

  chosenMonthHandler( normalizedMonth: Moment, datepicker: OwlDateTimeComponent<Moment> ) {
    // console.log(normalizedMonth);
    this.currentYear = moment(normalizedMonth).get('year').toString();
    this.currentMonth = moment(normalizedMonth).locale('es').format('MMMM');
    this.selectedYear = moment(normalizedMonth).get('year');
    this.selectedMonth = moment(normalizedMonth).get('month');
    datepicker.close();
    this.generar_rango_inicial(false);
  }

  chosenYearHandler( normalizedMonth: Moment, datepicker: OwlDateTimeComponent<Moment> ) {
    // console.log(normalizedMonth);
    if (this.show) {
      this.currentYear = moment(normalizedMonth).get('year').toString();
      this.selectedYear = moment(normalizedMonth).get('year');
      datepicker.close();
      this.consumo_por_meses();
    }
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
      this.generar_rango_inicial(false);
    });
  }

  consumo_por_meses() {
    this.energyService.getMonths(this.selectedYear).subscribe(res => {
      this.months = res as {Mes: number, Plan: number, Consumo: number}[];
      this.totalYearPlan = 0;
      this.totalYearConsume = 0;
      const consumos = [];
      const planes = [];
      for (let i = 0; i < this.months.length; i++) {
        if (i === 0) {
          this.months[i].PlanAcumulado = this.months[i].Plan;
          this.months[i].RealAcumulado = this.months[i].Consumo;
        } else {
          this.months[i].PlanAcumulado = this.months[i].Plan + this.months[i - 1].PlanAcumulado;
          this.months[i].RealAcumulado = this.months[i].Consumo + this.months[i - 1].RealAcumulado;
        }
        if (this.months[i].Plan > this.yscaleMax2) {
          this.yscaleMax2 = this.months[i].Plan + 100;
        }
        // tslint:disable-next-line: max-line-length
        consumos.push({name : moment().locale('es').set('month', this.months[i].Mes - 1).format('MMMM').toUpperCase(), value : this.months[i].Consumo});
        // tslint:disable-next-line: max-line-length
        planes.push({name : moment().locale('es').set('month', this.months[i].Mes - 1).format('MMMM').toUpperCase(), value : this.months[i].Plan});
        this.totalYearPlan += this.months[i].Plan;
        this.totalYearConsume += this.months[i].Consumo;
      }
      // tslint:disable-next-line: max-line-length
      this.multi2 = [{name: 'Plan ' + this.totalYearPlan + ' KW', series: planes}, {name: 'Consumo ' + this.totalYearConsume + ' KW', series: consumos}];
      // console.log(this.months);
    });
  }

  generar_rango_inicial(adjust: boolean) {
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
        if (this.erecords[i].plan > this.yscaleMax) {
          this.yscaleMax = this.erecords[i].plan + 10;
        }
        if (i > 0) {
          this.erecords[i].planacumulado = this.erecords[i].plan + this.erecords[i - 1].planacumulado;
        } else {
          this.erecords[i].planacumulado = this.erecords[i].plan;
        }
        if (this.erecords[i].lectura) {
          this.erecords[i].realacumulado = this.erecords[i].consumo + this.erecords[last].realacumulado;
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
        this.promConsume = Math.round(this.totalConsume / (last + 1));
      }
      // tslint:disable-next-line: max-line-length
      this.multi = [{name: 'Plan ' + this.totalPlan + ' KW', series: planes}, {name: 'Consumo ' + this.totalConsume + ' KW', series: consumos}];
      if (adjust) {
        this.consume_adjust();
      }
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
      if (i > 0 && this.erecords[i - 1].plan > 0 && !this.erecords[i - 1].consumo) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        Toast.fire({
          icon: 'error',
          title: 'Debe llenar el registro anterior.',
        } as SweetAlertOptions);
      } else {
        // tslint:disable-next-line: max-line-length
        const newe = Object.assign({}, this.erecords[i]);
        this.dialogService.open(NewErecordComponent, {context: {newERecord: newe, prev_reading: prev}}).onClose.subscribe(
          (newWRecord: ERecord) => {
            if (newWRecord) {
              this.generar_rango_inicial(true);
            }
          },
        );
      }
    });
  }

  openPlans() {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(EnergyPlansComponent, {context: {startDate: new Date(this.selectedYear, this.selectedMonth)}}).onClose.subscribe(
      (newWRecord: ERecord) => {
        if (newWRecord) {
          this.generar_rango_inicial(false);
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
      // console.log(this.erecords);
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
        // console.log(this.erecords[i].consumo);
        this.totalConsume += this.erecords[i].consumo;
        // console.log(this.totalConsume);
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
    if (!this.show) {
      const table_to_print = []; // tabla final a imprimir
      // tslint:disable-next-line: max-line-length
      const head = [
        '',
        'Día',
        'Plan acumulado',
        'Real acumulado',
        'Plan',
        'Real',
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
          {text: (this.erecords[i].planacumulado > 0) ? this.erecords[i].planacumulado.toString() : '', fillColor: bgcolor},
          {text: (this.erecords[i].realacumulado > 0) ? this.erecords[i].realacumulado.toString() : '', fillColor: bgcolor},
          {text: (this.erecords[i].plan > 0) ? this.erecords[i].plan.toString() : '', fillColor: bgcolor},
          {text: (this.erecords[i].consumo > 0) ? this.erecords[i].consumo.toString() : '', fillColor: bgcolor},
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
              widths: [70, 50, 90, 90, 50, 50, 70],
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
            text: 'Elaborado por: ' + this.user.fullname, fontSize: 12, width: 'auto',
          },
        ],
        pageMargins: [25, 35, 15, 5],
      };
      pdfMake.createPdf(docDefinition).download('Control de energía de ' + this.currentMonth + ' del ' + this.currentYear);
    } else {
      const table_to_print = []; // tabla final a imprimir
      // tslint:disable-next-line: max-line-length
      const head = [
        'Mes',
        'Plan',
        'Real',
        'Plan acumulado',
        'Real acumulado']; // cada fila
      table_to_print.push(head);
      for (let i = 0; i < this.months.length; i++) {
        // tslint:disable-next-line: max-line-length
        const mes = moment().set('month', this.months[i].Mes - 1).locale('es').format('MMMM').toUpperCase();
        const row = [
          {text: mes},
          {text: this.months[i].Plan.toString()},
          {text: this.months[i].Consumo.toString()},
          {text: this.months[i].PlanAcumulado.toString()},
          {text: this.months[i].RealAcumulado.toString()},
          ];
        table_to_print.push(row);
      }
      const docDefinition = {
        info: {
          title: 'Consumo de energía del ' + this.currentYear,
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
            text: 'Plan para el año ' + this.totalYearPlan + ' KW', fontSize: 15, width: 'auto',
          },
          {
            table: {
              widths: [90, 70, 70, 100, 100],
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
            text: 'Elaborado por: ' + this.user.fullname, fontSize: 12, width: 'auto',
          },
        ],
        pageMargins: [25, 35, 15, 5],
      };
      pdfMake.createPdf(docDefinition).download('Control de energía del ' + this.currentYear);
    }
  }

}
