import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UntypedFormControl } from '@angular/forms';
import { Task } from '../../models/Task';
import * as moment from 'moment';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { User } from '../../models/User';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit, AfterViewInit {
  @ViewChild('text_muted', {static: false}) text_muted: ElementRef;
  resumen_status: string = 'info';
  descripcion_status: string = 'info';
  sub_status: string = 'success';
  id_creador: any; // id del usuario q creo la tarea
  id_usuario: any; // id del usuario q va a realizar la tarea
  minutos: number = 0;
  horas: number = 0;
  checked: Boolean = false;
  fecha = new UntypedFormControl();
  hora = new UntypedFormControl();
  rango: string = 'single';
  task: Task = {
    id_usuario: 0,
    resumen: '',
    descripcion: '',
    fecha_inicio: new Date(),
    estado: 'Pendiente',
    id_creador: 0,
    duracion: 0,
    validada: false,
    fecha_fin: new Date(),
  };
  subordinados: User[] = [];
  selectedSubs = new UntypedFormControl();
  editing: boolean = false;
  constructor(protected dialogRef: NbDialogRef<any>) {
  }

  resumen_change() {
    if (this.task.resumen === '') {
      this.resumen_status = 'danger';
    } else {
      this.resumen_status = 'success';
    }
  }

  descripcion_change() {
    if (this.task.descripcion === '') {
      this.descripcion_status = 'danger';
    } else {
      this.descripcion_status = 'success';
    }
  }

  subordinados_change() {
    if (this.selectedSubs.value.length > 0) {
      this.sub_status = 'success';
    } else {
      this.sub_status = 'danger';
    }
  }

  ngOnInit() {
    if (!this.editing) {
      this.task.id_creador = this.id_creador;
      this.task.id_usuario = this.id_usuario;
      this.selectedSubs.setValue([this.id_usuario]);
    }
    // console.log(this.task);
  }

  ngAfterViewInit() {
    const picked_range: HTMLElement = this.text_muted.nativeElement;
    if (this.rango === 'range') {
      picked_range.setAttribute('class', '');
      this.checked = true;
    } else {
      picked_range.setAttribute('class', 'text-muted');
      this.checked = false;
    }
  }

  select_range(e) {
    this.fecha.setValue('');
    const picked_range: HTMLElement = this.text_muted.nativeElement;
    if (e) {
      this.rango = 'range';
      picked_range.setAttribute('class', '');
    } else {
      this.rango = 'single';
      picked_range.setAttribute('class', 'text-muted');
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  parseDate() {
    if (this.rango === 'range') {
      if (this.fecha.value.length > 1) {
        this.task.fecha_inicio = new Date(this.fecha.value[0]);
        this.task.fecha_fin = new Date(this.fecha.value[1]);
      }
    } else {
      this.task.fecha_inicio = new Date(this.fecha.value);
      this.task.fecha_fin = this.task.fecha_inicio;
    }
  }

  parseTime() {
    if (this.hora.value) {
      //console.log(this.hora.value);
      //this.hora.value[0] = new Date(this.hora.value[0]);
      //this.hora.value[1] = new Date(this.hora.value[1]);
      //this.hora.value[0] = new Date(Date.UTC(this.hora.value[0].getUTCFullYear(), this.hora.value[0].getUTCMonth(), this.hora.value[0].getUTCDate(), this.hora.value[0].getUTCHours(), this.hora.value[0].getUTCMinutes(), this.hora.value[0].getUTCSeconds()));
      //this.hora.value[1] = new Date(Date.UTC(this.hora.value[1].getUTCFullYear(), this.hora.value[1].getUTCMonth(), this.hora.value[1].getUTCDate(), this.hora.value[1].getUTCHours(), this.hora.value[1].getUTCMinutes(), this.hora.value[1].getUTCSeconds()));
      //this.hora.value[0] = this.convertUTCDateToLocalDate(this.hora.value[0]);
      //this.hora.value[1] = this.convertUTCDateToLocalDate(this.hora.value[1]);
      //console.log(this.hora.value);
      const tduracion = moment(this.hora.value[1]).diff(moment(this.hora.value[0]), 'minutes');
      this.task.duracion = tduracion;
      this.parseDate();
      const hora_inicio = moment(this.hora.value[0]).hour();
      const min_inicio = moment(this.hora.value[0]).minute();
      this.task.fecha_inicio = this.convertUTCDateToLocalDate(moment(this.task.fecha_inicio).hour(hora_inicio).minute(min_inicio).toDate());
      this.task.fecha_fin = this.convertUTCDateToLocalDate(moment(this.task.fecha_fin).hour(hora_inicio).minute(min_inicio).toDate());
      //this.task.fecha_inicio = moment(this.task.fecha_inicio).minute(min_inicio).toDate();
      //this.task.fecha_fin = moment(this.task.fecha_fin).minute(min_inicio).toDate();
      //console.log(this.task.fecha_inicio);
    }
  }

  convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }

  save() {
    // console.log( this.sub_seleccionados);
    if (this.validate_task()) {
      this.parseTime();
      const newTask = {task: this.task, subs: this.selectedSubs.value};
      this.dialogRef.close(newTask);
    }
  }

  validate_task() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if ((this.selectedSubs.value && this.selectedSubs.value.length === 0) && this.subordinados.length > 0) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar para que usuario(s) será la tarea.',
      } as SweetAlertOptions);
      this.sub_status = 'danger';
      return false;
    } else if (this.task.resumen === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un resumen.',
      } as SweetAlertOptions);
      this.resumen_status = 'danger';
      return false;
    } else if (this.task.descripcion === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una descripción.',
      } as SweetAlertOptions);
      this.descripcion_status = 'danger';
      return false;
    } else if (!this.fecha.value) {
      Toast.fire({
        icon: 'error',
        title: 'Debe especificar una fecha.',
      } as SweetAlertOptions);
      return false;
    } else if (!this.hora.value) {
      Toast.fire({
        icon: 'error',
        title: 'Debe especificar una hora.',
      } as SweetAlertOptions);
      return false;
    } else if (this.hora.value.length < 2) {
      Toast.fire({
        icon: 'error',
        title: 'Debe especificar una hora.',
      } as SweetAlertOptions);
      return false;
    }
    return true;
  }

}
