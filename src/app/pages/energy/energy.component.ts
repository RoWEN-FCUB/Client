import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ERecord } from '../../models/ERecord';
import { NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import 'moment/min/locales';
import { UserService } from '../../services/user.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { EnergyService } from '../../services/energy.service';
import { NewErecordComponent } from '../new-erecord/new-erecord.component';
import { EnergyPlansComponent } from '../energy-plans/energy-plans.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css'],
})
export class EnergyComponent implements OnInit {

  @ViewChild('mes', {static: false}) mes: ElementRef;
  erecords: ERecord[];
  currentMonth: string;
  currentYear: string;
  totalPlan: number = 0;
  totalConsume: number = 0;
  promConsume: number = 0;
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
      this.generar_rango_inicial();
    });
  }

  onSelect(event) {
    // console.log(event);
  }

  toogleGraph() {
    this.showgraph = !this.showgraph;
  }

  changeMonth() {
    const picked_range: HTMLElement = this.mes.nativeElement;
    picked_range.click();
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
    let fday = moment().startOf('month').toDate();
    // fday.setTime(fday.getTime() + fday.getTimezoneOffset() * 60 * 1000);
    const lday = moment().endOf('month').toDate();
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
    this.energyService.getERecords(moment().get('year'), moment().get('month') + 1).subscribe((res: ERecord[]) => {
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

}
