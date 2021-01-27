import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Company } from '../../models/Company';
import 'moment/min/locales';
import * as moment from 'moment';
import { EnergyService } from '../../services/energy.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { EService } from '../../models/EService';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'energy-plans',
  templateUrl: './energy-plans.component.html',
  styleUrls: ['./energy-plans.component.css']
})
export class EnergyPlansComponent implements OnInit {
  plan_status: string = 'info';
  ppicd_status: string = 'info';
  ppicn_status: string = 'info';
  plan_establecido: number = 0;
  plan_picod: number = 0;
  plan_picon: number = 0;
  dates = [];
  fecha_inicio: Date = new Date();
  fecha_fin: Date = new Date();
  startDate: Date; // fecha inicial en la que abre el selector de fecha
  company: Company = {};
  service: EService;
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

  ppicd_change() {
    if (!isNaN(this.plan_picod)) {
      this.ppicd_status = 'success';
    } else {
      this.ppicd_status = 'danger';
    }
  }

  ppicn_change() {
    if (!isNaN(this.plan_picon)) {
      this.ppicn_status = 'success';
    } else {
      this.ppicn_status = 'danger';
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
    } else if (this.ppicd_status === 'danger' || (this.service.pico_diurno && !this.plan_picod)) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una plan para el horario pico diurno válido.',
      } as SweetAlertOptions);
      this.ppicd_status = 'danger';
    } else if (this.ppicn_status === 'danger' || (this.service.pico_nocturno && !this.plan_picon)) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una plan para el horario pico nocturno válido.',
      } as SweetAlertOptions);
      this.ppicn_status = 'danger';
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
      // tslint:disable-next-line: max-line-length
      this.energyService.updateAllPlans(this.plan_establecido, this.plan_picod, this.plan_picon, this.fecha_inicio, this.fecha_fin, this.service.id).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Planes actualizados correctamente.',
        } as SweetAlertOptions);
        this.dialogRef.close(res);
      });
    }
  }

}
