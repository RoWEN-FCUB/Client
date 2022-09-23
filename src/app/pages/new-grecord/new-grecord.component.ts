import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';
import { GRecord } from '../../models/GRecord';

@Component({
  selector: 'new-grecord',
  templateUrl: './new-grecord.component.html',
  styleUrls: ['./new-grecord.component.scss'],
})
export class NewGrecordComponent implements OnInit {
  title: string = '';
  fecha_status: string = 'info';
  tipo_status: string = 'info';
  hora_status: string = 'info';
  horametro_inicial_status: string = 'info';
  horametro_final_status: string = 'info';
  hora = new FormControl();
  fecha;
  operacion_anterior: GRecord;
  horas_trabajadas: number = 0;
  nueva_operacion: GRecord = {
    A: '',
    M: '',
    D: '',
    tipo: '',
  };

  constructor(protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(null);
  }

  onDateChange() {
    this.fecha_status = 'success';
    this.nueva_operacion.A = moment(this.fecha).get('year').toString().substring(2);
    this.nueva_operacion.M = (moment(this.fecha).get('month') + 1).toString();
    this.nueva_operacion.D = moment(this.fecha).date().toString();
  }

  onTypeChange() {
    this.tipo_status = 'success';
  }

  onTimeChange() {
    if (this.hora.value) {
      /*this.hora.value[0] = new Date(this.hora.value[0]);
      this.hora.value[1] = new Date(this.hora.value[1]);
      this.hora.value[0] = this.convertUTCDateToLocalDate(this.hora.value[0]);
      this.hora.value[1] = this.convertUTCDateToLocalDate(this.hora.value[1]);*/
      this.nueva_operacion.hora_inicial = this.hora.value[0];
      this.nueva_operacion.hora_final = this.hora.value[1];
      this.horas_trabajadas = this.round(moment(this.hora.value[1]).diff(moment(this.hora.value[0]), 'minutes') / 60);
      this.hora_status = 'success';
      console.log(this.nueva_operacion);
    }
  }

  round(numb: number) {
    return Math.round( ( numb + Number.EPSILON ) * 100 ) / 100;
  }

  convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }
}
