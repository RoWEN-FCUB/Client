import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ERecord } from '../../models/ERecord';
import { EService } from '../../models/EService';
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
  service: EService = {};
  plan_status: string = 'info';
  lectura_status: string = 'info';
  ppicd_status: string = 'info';
  ppicn_status: string = 'info';
  lectura_hpicd1_status: string = 'info';
  lectura_hpicd2_status: string = 'info';
  lectura_hpicn1_status: string = 'info';
  lectura_hpicn2_status: string = 'info';

  constructor(private energyService: EnergyService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
    console.log(this.newERecord);
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
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
    } else if (this.lectura_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una lectura válida.',
      } as SweetAlertOptions);
    } else if (this.ppicd_status === 'danger' || (!this.newERecord.plan_hpicd && !this.newERecord.id && this.service.pico_diurno)) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una plan válido para el horario pico diurno.',
      } as SweetAlertOptions);
      this.ppicd_status = 'danger';
    } else if (this.ppicn_status === 'danger' || (!this.newERecord.plan_hpicn && !this.newERecord.id && this.service.pico_nocturno)) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una plan válido para el horario pico nocturno.',
      } as SweetAlertOptions);
      this.ppicn_status = 'danger';
    // tslint:disable-next-line: max-line-length
    } else if (this.lectura_hpicd1_status === 'danger' || (!this.newERecord.lectura_hpicd1 && this.service.pico_diurno)) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una primera lectura válida para el horario pico diurno.',
      } as SweetAlertOptions);
      this.lectura_hpicd1_status = 'danger';
    // tslint:disable-next-line: max-line-length
    } else if (this.lectura_hpicd2_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una segunda lectura válida para el horario pico diurno.',
      } as SweetAlertOptions);
      this.lectura_hpicd2_status = 'danger';
    } else if (this.lectura_hpicn1_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una primera lectura válida para el horario pico nocturno.',
      } as SweetAlertOptions);
      this.lectura_hpicn1_status = 'danger';
    // tslint:disable-next-line: max-line-length
    } else if (this.lectura_hpicn2_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una segunda lectura válida para el horario pico nocturno.',
      } as SweetAlertOptions);
      this.lectura_hpicn2_status = 'danger';
    } else {
      if (this.newERecord.id) {
        // console.log(this.newERecord);
        this.energyService.updateERecord(this.newERecord.id, this.newERecord).subscribe(res => {
          this.dialogRef.close(this.newERecord);
        });
      } else {
        this.newERecord.id_serv = this.service.id;
        this.energyService.saveERecord(this.newERecord).subscribe(res => {
          this.dialogRef.close(this.newERecord);
        });
      }
    }
  }

  plan_change() {
    if (!isNaN(this.newERecord.plan)) {
      this.plan_status = 'success';
    } else {
      this.plan_status = 'danger';
    }
  }

  ppicd_change() {
    if (!isNaN(this.newERecord.plan_hpicd)) {
      this.ppicd_status = 'success';
    } else {
      this.ppicd_status = 'danger';
    }
  }

  ppicn_change() {
    if (!isNaN(this.newERecord.plan_hpicn)) {
      this.ppicn_status = 'success';
    } else {
      this.ppicn_status = 'danger';
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
  }

  lectura_hpicd1_change() {
    const nameregexp = new RegExp(/^[1-9]{1}[0-9]*$/);
    if (nameregexp.test(this.newERecord.lectura_hpicd1.toString()) && this.newERecord.lectura_hpicd1 > this.prev_reading) {
      this.lectura_hpicd1_status = 'success';
    } else {
      this.lectura_hpicd1_status = 'danger';
    }
  }

  lectura_hpicd2_change() {
    const nameregexp = new RegExp(/^[1-9]{1}[0-9]*$/);
    if (nameregexp.test(this.newERecord.lectura_hpicd2.toString()) && this.newERecord.lectura_hpicd2 > this.newERecord.lectura_hpicd1) {
      this.lectura_hpicd2_status = 'success';
    } else {
      this.lectura_hpicd2_status = 'danger';
    }
  }

  lectura_hpicn1_change() {
    const nameregexp = new RegExp(/^[1-9]{1}[0-9]*$/);
    // tslint:disable-next-line: max-line-length
    if (nameregexp.test(this.newERecord.lectura_hpicn1.toString()) && this.newERecord.lectura_hpicn1 > this.prev_reading && !(this.service.pico_diurno && this.newERecord.lectura_hpicd2 > this.newERecord.lectura_hpicn1)) {
      this.lectura_hpicn1_status = 'success';
    } else {
      this.lectura_hpicn1_status = 'danger';
    }
  }

  lectura_hpicn2_change() {
    const nameregexp = new RegExp(/^[1-9]{1}[0-9]*$/);
    if (nameregexp.test(this.newERecord.lectura_hpicn2.toString()) && this.newERecord.lectura_hpicn2 > this.newERecord.lectura_hpicn1) {
      this.lectura_hpicn2_status = 'success';
    } else {
      this.lectura_hpicn2_status = 'danger';
    }
  }

}
