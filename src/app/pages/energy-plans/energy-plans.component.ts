import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ERecord } from '../../models/ERecord';
import 'moment/min/locales';
import * as moment from 'moment';
import { EnergyService } from '../../services/energy.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'energy-plans',
  templateUrl: './energy-plans.component.html',
  styleUrls: ['./energy-plans.component.css']
})
export class EnergyPlansComponent implements OnInit {
  plan_status: string = 'info';
  plan_establecido: number;
  dates = [];
  fecha_inicio: Date = new Date();
  fecha_fin: Date = new Date();
  constructor(private energyService: EnergyService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  plan_change() {
    const nameregexp = new RegExp(/^[1-9]{1}[0-9]*$/);
    if (nameregexp.test(this.plan_establecido.toString())) {
      this.plan_status = 'success';
    } else {
      this.plan_status = 'danger';
    }
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
    if (this.plan_status === 'danger' || !this.plan_establecido) {
      this.plan_status = 'danger';
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un plan válido.',
      } as SweetAlertOptions);
    } else if (this.dates.length !== 2) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar un rango de fechas válido.',
      } as SweetAlertOptions);
    } else {
      this.fecha_inicio = new Date(this.dates[0]);
      if (!this.dates[1]) {
        this.fecha_fin = this.fecha_inicio;
      } else {
        this.fecha_fin = new Date(this.dates[1]);
      }
      this.energyService.updateAllPlans(this.plan_establecido, this.fecha_inicio, this.fecha_fin).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

}