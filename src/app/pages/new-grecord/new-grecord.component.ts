import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { GRecord } from '../../models/GRecord';
import { GEE } from '../../models/GEE';
import { Time } from '@angular/common';

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
  hora = new UntypedFormControl([]);
  fecha;
  operacion_anterior: GRecord = {};
  horas_trabajadas: number = 0; // diferencia entre hora inicial y final
  diferencia_horametro: number = 0; // diferencia entre horametros
  nueva_operacion: GRecord = {
    id_gee: -1,
    id_usuario: -1,
    D: '',
    M: '',
    A: '',
    tipo: '',
    hora_inicial: null,
    hora_final: null,
    horametro_inicial: 0,
    horametro_final: 0,
    tiempo_trabajado: 0,
    energia_generada: 0,
    combustible_consumido: 0,
    combustible_existencia: 0,
    observaciones: '',
  };
  horario_diurno: string = '';
  existencia_combustible: number = 0;
  gee: GEE = {};
  user = {id: 0};

  constructor(protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
    // console.log(this.operacion_anterior);
    if (this.operacion_anterior) {
      this.nueva_operacion.horametro_inicial = this.operacion_anterior.horametro_final;
      this.horametro_inicial_status = 'success';
    }
    if (this.gee) {
      this.nueva_operacion.id_gee = this.gee.id;
    }
    if (this.nueva_operacion.id) {
      this.fecha = moment(this.nueva_operacion.A + '-' + this.nueva_operacion.M + '-' + this.nueva_operacion.D, 'YYYY-MM-DD').toDate();
      // this.hora = new UntypedFormControl([moment(this.nueva_operacion.hora_inicial, 'HH:mm:ss'), moment(this.nueva_operacion.hora_final, 'HH:mm:ss')]);
      this.hora.value.push(moment.parseZone(this.nueva_operacion.hora_inicial, 'HH:mm:ss').local(true).format());
      this.hora.value.push(moment.parseZone(this.nueva_operacion.hora_final, 'HH:mm:ss').local(true).format());
      console.log(this.hora);
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
     //guarda el nuevo registro nueva_operacion almacenado en la base de datos (db.js)
     const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
     if (this.fecha_status != 'success') {
      Toast.fire({
        icon: 'error',
        title: 'Debe establecer la fecha de la operación.',
      } as SweetAlertOptions);
      this.fecha_status = 'danger';
     } else if (this.tipo_status != 'success') {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar el tipo de operación.',
      } as SweetAlertOptions);
      this.tipo_status = 'danger';
     } else if (this.hora_status != 'success') {
      Toast.fire({
        icon: 'error',
        title: 'Debe establecer la hora de la operación.',
      } as SweetAlertOptions);
      this.hora_status = 'danger';
     } else if (this.tipo_status != 'success') {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar el tipo de operación.',
      } as SweetAlertOptions);
      this.tipo_status = 'danger';
     } else if (this.horametro_inicial_status != 'success') {
      Toast.fire({
        icon: 'error',
        title: 'Debe establecer el horámetro inicial de la operación.',
      } as SweetAlertOptions);
      this.horametro_inicial_status = 'danger';
     } else if (this.horametro_final_status != 'success') {
      Toast.fire({
        icon: 'error',
        title: 'Debe establecer el horámetro final de la operación.',
      } as SweetAlertOptions);
      this.horametro_final_status = 'danger';
     } else {
      let nuevas_operaciones : any[] = [];
      this.nueva_operacion.tiempo_trabajado = this.horas_trabajadas;  //guarda el tiempo total de ejecucion de la operación
      let hinicial: Time = {hours: 0, minutes: 0}; //horario de trabajo diurno inicial
      let hfinal: Time = {hours: 0, minutes: 0}; //horario de trabajo diurno final
      const horas = this.horario_diurno.split('-');
      hinicial.hours = parseInt(horas[0].split(':')[0], 10); //hours from 00 to 23. 00 = 00:00:00 - 23:59
      hinicial.minutes = (parseInt(horas[0].split(':')[1], 10)); //minutes from 00 to 59.
      hfinal.hours = (parseInt(horas[1].split(':')[0], 10)); //hours from 00 to 23. 00 = 00
      hfinal.minutes = (parseInt(horas[1].split(':')[1], 10)); //minutes from 00 to 59.
      const ohi = moment(this.nueva_operacion.hora_inicial).set('seconds', 0); //operacion horario inicial
      const ohf = moment(this.nueva_operacion.hora_final).set('seconds', 0); //operacion horario final
      if (this.nueva_operacion.tipo === 'PS' || this.nueva_operacion.tipo === 'LS') { //operaciones sin carga
        this.nueva_operacion.id_usuario = this.user.id;
        this.nueva_operacion.id_gee = this.gee.id;
        this.nueva_operacion.combustible_consumido = this.round(this.nueva_operacion.tiempo_trabajado * this.gee.ic_scarga, 2);  //guarda el combustible consumido de la operación
        this.nueva_operacion.energia_generada = this.round(this.nueva_operacion.tiempo_trabajado * this.gee.dl, 2); //round to 2 decimals
        this.nueva_operacion.horametro_inicial = Number(this.nueva_operacion.horametro_inicial); //convertir a numero
        this.nueva_operacion.horametro_final = Number(this.nueva_operacion.horametro_final); //convertir a numero
        this.nueva_operacion.combustible_existencia = this.round(this.existencia_combustible - this.nueva_operacion.combustible_consumido, 2); //combustible existencia
        this.nueva_operacion.hora_inicial = {hours: ohi.get('hours'), minutes: ohi.get('minutes')};
        this.nueva_operacion.hora_final = {hours: ohf.get('hours'), minutes: ohf.get('minutes')};
        nuevas_operaciones.push(Object.values(this.nueva_operacion)); //guarda la nueva operación
      } else {
        if (ohi.isBefore(hinicial, 'minutes')) { //operacion comienza antes del horario laboral
          if (ohf.isSameOrBefore(hinicial, 'minutes')) { //y termna antes del horario laboral
            //caso 1 la operacion es antes del horario laboral
            this.nueva_operacion.id_usuario = this.user.id;
            this.nueva_operacion.id_gee = this.gee.id;
            this.nueva_operacion.combustible_consumido = this.nueva_operacion.tiempo_trabajado * this.gee.ic_ccargan, 2; //combustible consumido fuera del horario laboral
            this.nueva_operacion.energia_generada = this.round(this.nueva_operacion.tiempo_trabajado * this.gee.dl, 2); //round to 2 decimals
            this.nueva_operacion.horametro_inicial = Number(this.nueva_operacion.horametro_inicial); //convertir a numero
            this.nueva_operacion.horametro_final = Number(this.nueva_operacion.horametro_final); //convertir a numero
            this.nueva_operacion.combustible_existencia = this.round(this.existencia_combustible - this.nueva_operacion.combustible_consumido, 2); //combustible existencia
            this.nueva_operacion.hora_inicial = {hours: ohi.get('hours'), minutes: ohi.get('minutes')};
            this.nueva_operacion.hora_final = {hours: ohf.get('hours'), minutes: ohf.get('minutes')};
            nuevas_operaciones.push(Object.values(this.nueva_operacion)); //guarda la nueva operación
          } else if (ohf.isAfter(hinicial,'minutes')) {
            if (ohf.isSameOrBefore(hfinal, 'minutes')) {
              //caso 2 la operacion empieza antes del horario laboral y termina dentro del mismo
              let n_op1: GRecord = {
                id_gee: this.gee.id,
                id_usuario: this.user.id,
                D: this.nueva_operacion.D,
                M: this.nueva_operacion.M,
                A: this.nueva_operacion.A,
                tipo: this.nueva_operacion.tipo,
                hora_inicial: {hours: ohi.get('hours'), minutes: ohi.get('minutes')},
                hora_final: {hours: hinicial.hours, minutes: hinicial.minutes},
                horametro_inicial: 	Number(this.nueva_operacion.horametro_inicial), 	//horas, minutos y segundos
                horametro_final: 0,
                tiempo_trabajado: this.round(moment(hinicial).diff(ohi, 'minutes') / 60, 2),
                energia_generada: 0,
                combustible_consumido: 0,
                combustible_existencia: 0,                
                observaciones: '',
              };
              n_op1.horametro_final = Number(n_op1.horametro_inicial + n_op1.tiempo_trabajado);
              n_op1.energia_generada = n_op1.tiempo_trabajado * this.gee.dl;
              n_op1.combustible_consumido = n_op1.tiempo_trabajado * this.gee.ic_ccargan;
              n_op1.combustible_existencia = this.round(this.existencia_combustible - n_op1.combustible_consumido, 2);
              this.existencia_combustible -= n_op1.combustible_consumido; //resta combustible consumido a existencia combustible actual
              nuevas_operaciones.push(Object.values(n_op1)); //guarda la nueva operación
              let n_op2: GRecord = {
                id_gee: this.gee.id,
                id_usuario: this.user.id,
                D: this.nueva_operacion.D,
                M: this.nueva_operacion.M,
                A: this.nueva_operacion.A,
                tipo: this.nueva_operacion.tipo,
                hora_inicial: {hours: hinicial.hours, minutes: hinicial.minutes},
                hora_final: {hours: ohf.get('hours'), minutes: ohf.get('minutes')},
                horametro_inicial: 	n_op1.horametro_final, 	//horas, minutos y segundos
                horametro_final: 0,
                tiempo_trabajado: this.round(ohf.diff(moment(hinicial), 'minutes') / 60, 2),
                energia_generada: 0,
                combustible_consumido: 0,
                combustible_existencia: 0,
                observaciones: '',
              };
              n_op2.horametro_final = Number(n_op2.horametro_inicial + n_op2.tiempo_trabajado);
              n_op2.energia_generada = n_op2.tiempo_trabajado * this.gee.dl;
              n_op2.combustible_consumido = n_op2.tiempo_trabajado * this.gee.ic_ccargad;
              n_op2.combustible_existencia = this.round(this.existencia_combustible - n_op2.combustible_consumido, 2);
              this.existencia_combustible -= n_op2.combustible_consumido; //resta combustible consumido a existencia combustible actual
              nuevas_operaciones.push(Object.values(n_op2)); //guarda la nueva operación 
            } else {
              //caso 3 la operacion empieza antes del hrario laboral y termina despues del mismo
              let n_op1: GRecord = {
                id_gee: this.gee.id,
                id_usuario: this.user.id,
                D: this.nueva_operacion.D,
                M: this.nueva_operacion.M,
                A: this.nueva_operacion.A,
                tipo: this.nueva_operacion.tipo,
                hora_inicial: {hours: ohi.get('hours'), minutes: ohi.get('minutes')},
                hora_final: {hours: hinicial.hours, minutes: hinicial.minutes},
                horametro_inicial: 	Number(this.nueva_operacion.horametro_inicial), 	//horas, minutos y segundos
                horametro_final: 0,
                tiempo_trabajado: this.round(moment(hinicial).diff(ohi, 'minutes') / 60, 2),
                energia_generada: 0,
                combustible_consumido: 0,
                combustible_existencia: 0,
                observaciones: '',
              };
              n_op1.horametro_final = Number(n_op1.horametro_inicial + n_op1.tiempo_trabajado);
              n_op1.energia_generada = n_op1.tiempo_trabajado * this.gee.dl;
              n_op1.combustible_consumido = n_op1.tiempo_trabajado * this.gee.ic_ccargan;
              n_op1.combustible_existencia = this.round(this.existencia_combustible - n_op1.combustible_consumido, 2);
              this.existencia_combustible -= n_op1.combustible_consumido; //resta combustible consumido a existencia combustible actual
              nuevas_operaciones.push(Object.values(n_op1)); //guarda la nueva operación
              let n_op2: GRecord = {
                id_gee: this.gee.id,
                id_usuario: this.user.id,
                D: this.nueva_operacion.D,
                M: this.nueva_operacion.M,
                A: this.nueva_operacion.A,
                tipo: this.nueva_operacion.tipo,
                hora_inicial: {hours: hinicial.hours, minutes: hinicial.minutes},
                hora_final: {hours: hfinal.hours, minutes: hfinal.minutes},
                horametro_inicial: 	n_op1.horametro_final, 	//horas, minutos y segundos
                horametro_final: 0,
                tiempo_trabajado: this.round(moment(hfinal).diff(moment(hinicial), 'minutes') / 60, 2),
                energia_generada: 0,
                combustible_consumido: 0,
                combustible_existencia: 0,
                observaciones: '',
              };
              n_op2.horametro_final = Number(n_op2.horametro_inicial + n_op2.tiempo_trabajado);
              n_op2.energia_generada = n_op2.tiempo_trabajado * this.gee.dl;
              n_op2.combustible_consumido = n_op2.tiempo_trabajado * this.gee.ic_ccargad;
              n_op2.combustible_existencia = this.round(this.existencia_combustible - n_op2.combustible_consumido, 2);
              this.existencia_combustible -= n_op2.combustible_consumido; //resta combustible consumido a existencia combustible actual
              nuevas_operaciones.push(Object.values(n_op2)); //guarda la nueva operación 
              let n_op3: GRecord = {
                id_gee: this.gee.id,
                id_usuario: this.user.id,
                D: this.nueva_operacion.D,
                M: this.nueva_operacion.M,
                A: this.nueva_operacion.A,
                tipo: this.nueva_operacion.tipo,
                hora_inicial: {hours: hfinal.hours, minutes: hfinal.minutes},
                hora_final: {hours: ohf.get('hours'), minutes: ohf.get('minutes')},
                horametro_inicial: 	n_op2.horametro_final, 	//horas, minutos y segundos
                horametro_final: 0,
                tiempo_trabajado: this.round(ohf.diff(moment(hfinal), 'minutes') / 60, 2),
                energia_generada: 0,
                combustible_consumido: 0,
                combustible_existencia: 0,
                observaciones: '',
              };
              n_op3.horametro_final = Number(n_op3.horametro_inicial + n_op3.tiempo_trabajado);
              n_op3.energia_generada = n_op3.tiempo_trabajado * this.gee.dl;
              n_op3.combustible_consumido = n_op3.tiempo_trabajado * this.gee.ic_ccargan;
              n_op3.combustible_existencia = this.round(this.existencia_combustible - n_op3.combustible_consumido, 2);
              this.existencia_combustible -= n_op3.combustible_consumido; //resta combustible consumido a existencia combustible actual
              nuevas_operaciones.push(Object.values(n_op3)); //guarda la nueva operación              
            }
          }
        } else if (ohi.isSameOrAfter(hinicial, 'minutes') && ohi.isBefore(hfinal, 'minutes')) { //operacion comienza dentro del horario laboral
          if (ohf.isSameOrBefore(hfinal, 'minutes')) {
            //caso 4 la operacion es dentro del horario laboral
            this.nueva_operacion.id_usuario = this.user.id;
            this.nueva_operacion.id_gee = this.gee.id;
            this.nueva_operacion.combustible_consumido = this.round(this.nueva_operacion.tiempo_trabajado * this.gee.ic_ccargad, 2);  //guarda el combustible consumido de la operación
            this.nueva_operacion.energia_generada = this.round(this.nueva_operacion.tiempo_trabajado * this.gee.dl, 2); //round to 2 decimals
            this.nueva_operacion.horametro_inicial = Number(this.nueva_operacion.horametro_inicial); //convertir a numero
            this.nueva_operacion.horametro_final = Number(this.nueva_operacion.horametro_final); //convertir a numero
            this.nueva_operacion.combustible_existencia = this.round(this.existencia_combustible - this.nueva_operacion.combustible_consumido, 2); //combustible existencia
            this.nueva_operacion.hora_inicial = {hours: ohi.get('hours'), minutes: ohi.get('minutes')};
            this.nueva_operacion.hora_final = {hours: ohf.get('hours'), minutes: ohf.get('minutes')};
            nuevas_operaciones.push(Object.values(this.nueva_operacion)); //guarda la nueva operación
          } else {
            //caso 5 la operacion comienza en el horario laboral y termina fuera del mismo
            let n_op1: GRecord = {
              id_gee: this.gee.id,
              id_usuario: this.user.id,
              D: this.nueva_operacion.D,
              M: this.nueva_operacion.M,
              A: this.nueva_operacion.A,
              tipo: this.nueva_operacion.tipo,
              hora_inicial: {hours: ohi.get('hours'), minutes: ohi.get('minutes')},
              hora_final: {hours: hfinal.hours, minutes: hfinal.minutes},
              horametro_inicial: 	Number(this.nueva_operacion.horametro_inicial), 	//horas, minutos y segundos
              horametro_final: 0,
              tiempo_trabajado: this.round(moment(hfinal).diff(ohi, 'minutes') / 60, 2),
              energia_generada: 0,
              combustible_consumido: 0,
              combustible_existencia: 0,
              observaciones: '',
            };
            n_op1.horametro_final = Number(n_op1.horametro_inicial + n_op1.tiempo_trabajado);
            n_op1.energia_generada = n_op1.tiempo_trabajado * this.gee.dl;
            n_op1.combustible_consumido = n_op1.tiempo_trabajado * this.gee.ic_ccargad;
            n_op1.combustible_existencia = this.round(this.existencia_combustible - n_op1.combustible_consumido,2 );
            this.existencia_combustible -= n_op1.combustible_consumido; //resta combustible consumido a existencia combustible actual
            nuevas_operaciones.push(Object.values(n_op1)); //guarda la nueva operación
            let n_op2: GRecord = {
              id_gee: this.gee.id,
              id_usuario: this.user.id,
              D: this.nueva_operacion.D,
              M: this.nueva_operacion.M,
              A: this.nueva_operacion.A,
              tipo: this.nueva_operacion.tipo,
              hora_inicial: {hours: hfinal.hours, minutes: hfinal.minutes},
              hora_final: {hours: ohf.get('hours'), minutes: ohf.get('minutes')},
              horametro_inicial: 	n_op1.horametro_final, 	//horas, minutos y segundos
              horametro_final: 0,
              tiempo_trabajado: this.round(ohf.diff(moment(hfinal), 'minutes') / 60, 2),
              energia_generada: 0,
              combustible_consumido: 0,
              combustible_existencia: 0,
              observaciones: '',
            };
            n_op2.horametro_final = Number(n_op2.horametro_inicial + n_op2.tiempo_trabajado);
            n_op2.energia_generada = n_op2.tiempo_trabajado * this.gee.dl;
            n_op2.combustible_consumido = n_op2.tiempo_trabajado * this.gee.ic_ccargan;
            n_op2.combustible_existencia = this.round(this.existencia_combustible - n_op2.combustible_consumido, 2);
            this.existencia_combustible -= n_op2.combustible_consumido; //resta combustible consumido a existencia combustible actual
            nuevas_operaciones.push(Object.values(n_op2)); //guarda la nueva operación 
          }
        } else {
          //caso 6 la operacion es despues del horario laboral
          this.nueva_operacion.id_usuario = this.user.id;
          this.nueva_operacion.id_gee = this.gee.id;
          this.nueva_operacion.combustible_consumido = this.nueva_operacion.tiempo_trabajado * this.gee.ic_ccargan, 2; //combustible consumido fuera del horario laboral
          this.nueva_operacion.energia_generada = this.round(this.nueva_operacion.tiempo_trabajado * this.gee.dl, 2); //round to 2 decimals
          this.nueva_operacion.horametro_inicial = Number(this.nueva_operacion.horametro_inicial); //convertir a numero
          this.nueva_operacion.horametro_final = Number(this.nueva_operacion.horametro_final); //convertir a numero
          this.nueva_operacion.combustible_existencia = this.round(this.existencia_combustible - this.nueva_operacion.combustible_consumido, 2); //combustible existencia
          this.nueva_operacion.hora_inicial = {hours: ohi.get('hours'), minutes: ohi.get('minutes')};
          this.nueva_operacion.hora_final = {hours: ohf.get('hours'), minutes: ohf.get('minutes')};
          nuevas_operaciones.push(Object.values(this.nueva_operacion)); //guarda la nueva operación
        }
      }
      console.log(nuevas_operaciones); //imprime la lista de operaciones nuevas
      this.dialogRef.close(nuevas_operaciones);
     }
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
    // console.log(this.hora.value);
    if (this.hora.value.length === 2) {
      /*this.hora.value[0] = new Date(this.hora.value[0]);
      this.hora.value[1] = new Date(this.hora.value[1]);
      this.hora.value[0] = this.convertUTCDateToLocalDate(this.hora.value[0]);
      this.hora.value[1] = this.convertUTCDateToLocalDate(this.hora.value[1]);*/
      this.nueva_operacion.hora_inicial = this.hora.value[0];
      this.nueva_operacion.hora_final = this.hora.value[1];
      this.horas_trabajadas = this.round((moment(this.hora.value[1]).diff(moment(this.hora.value[0]), 'minutes') / 60), 1);
      this.hora_status = 'success';
      if (this.diferencia_horametro > 0 && this.diferencia_horametro !== this.horas_trabajadas) {
        this.horametro_final_status = 'danger';
      } else {
        this.horametro_final_status = 'success';
      }
    }
  }

  onHorametroFinalChange() {
    if (Number(this.nueva_operacion.horametro_final) && Number(this.nueva_operacion.horametro_inicial)) {
      // tslint:disable-next-line: max-line-length
      this.diferencia_horametro = this.round(Number(this.nueva_operacion.horametro_final) - Number(this.nueva_operacion.horametro_inicial), 1);
      if (this.diferencia_horametro !== this.horas_trabajadas) {
        this.horametro_final_status = 'danger';
      } else {
        this.horametro_final_status = 'success';
      }
    }
  }

  round(numb: number, precision: number) {
    const exp: number = Math.pow(10, precision);
    return Math.round( ( numb + Number.EPSILON ) * exp ) / exp;
  }

  convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }
}
