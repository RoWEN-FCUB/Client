import { Component, OnInit } from '@angular/core';
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
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  constructor(private energyService: EnergyService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.currentYear = moment().get('year').toString();
    this.currentMonth = moment().locale('es').format('MMMM');
    this.generar_rango_inicial();
  }

  generar_rango_inicial() {
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
      }
      this.erecords.push(erecord);
      fday = moment(fday).locale('es').add(1, 'days').toDate();
    }
    this.energyService.getERecords(moment().get('year'), moment().get('month') + 1).subscribe((res: ERecord[]) => {
      // console.log(res);
      // console.log(this.erecords);
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
      let last = 0;
      for (let i = 0; i < this.erecords.length; i++) {
        this.totalConsume += this.erecords[i].consumo;
        this.totalPlan += this.erecords[i].plan;
        this.erecords[i].realacumulado = this.erecords[i].consumo + this.erecords[last].realacumulado;
        this.erecords[i].planacumulado = this.erecords[i].plan + this.erecords[last].planacumulado;
        if (this.erecords[i].id) {
          last = i;
        }
      }
      // console.log(this.erecords);
    });
  }

  openNew(i: number) {
    let prev: number = 0;
    // tslint:disable-next-line: max-line-length
    this.energyService.getEReading(moment.utc(this.erecords[i].fecha).format('YYYY-MM-DD')).subscribe((res: ERecord[]) => {
      if (res.length > 0) {
        prev = res[0].lectura;
      }
      // tslint:disable-next-line: max-line-length
      const newe = Object.assign({}, this.erecords[i]);
      this.dialogService.open(NewErecordComponent, {context: {newERecord: newe, prev_reading: prev}}).onClose.subscribe(
        (newWRecord) => {
          if (newWRecord) {
            this.generar_rango_inicial();
          }
        },
      );
    });
  }

}
