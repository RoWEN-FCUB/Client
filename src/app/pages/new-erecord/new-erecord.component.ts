import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ERecord } from '../../models/ERecord';
import 'moment/min/locales';
import * as moment from 'moment';
import { EnergyService } from '../../services/energy.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-erecord',
  templateUrl: './new-erecord.component.html',
  styleUrls: ['./new-erecord.component.css'],
})
export class NewErecordComponent implements OnInit {

  newERecord: ERecord = {};
  prev_reading: number;
  plan_status: string = 'info';
  lectura_status: string = 'info';
  ppic_status: string = 'info';
  rpic_status: string = 'info';

  constructor(private energyService: EnergyService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(null);
  }

  /*save() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.plan_status === 'danger' || !this.newERecord.plan) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un plan válido.',
      } as SweetAlertOptions);
    } else if (this.lectura_status === 'danger' || !this.newERecord.lectura) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una lectura válida.',
      } as SweetAlertOptions);
    } else if (this.ppic_status === 'danger' || (!this.newERecord.plan_hpic && !this.newERecord.id)) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una plan para el horario pico válido.',
      } as SweetAlertOptions);
    } else if (this.rpic_status === 'danger' || !this.newERecord.real_hpic) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un consumo para el horario pico válido.',
      } as SweetAlertOptions);
    } else {
      if (this.newERecord.id) {
        this.energyService.updateERecord(this.newERecord.id, this.newERecord).subscribe(res => {
          this.dialogRef.close(this.newERecord);
        });
      } else {
        this.energyService.saveERecord(this.newERecord).subscribe(res => {
          this.dialogRef.close(this.newERecord);
        });
      }
    }
  }*/

  plan_change() {
    if (!isNaN(this.newERecord.plan)) {
      this.plan_status = 'success';
    } else {
      this.plan_status = 'danger';
    }
  }

  /*ppic_change() {
    if (!isNaN(this.newERecord.plan_hpic)) {
      this.ppic_status = 'success';
    } else {
      this.ppic_status = 'danger';
    }
  }

  rpic_change() {
    if (!isNaN(this.newERecord.real_hpic)) {
      this.rpic_status = 'success';
    } else {
      this.rpic_status = 'danger';
    }
  }

  lectura_change() {
    const nameregexp = new RegExp(/^[1-9]{1}[0-9]*$/);
    if (nameregexp.test(this.newERecord.lectura.toString())) {
      this.lectura_status = 'success';
    } else {
      this.lectura_status = 'danger';
    }
    if (Number(this.newERecord.lectura)) {
      this.newERecord.consumo = this.newERecord.lectura - this.prev_reading;
    }
  }*/

}
