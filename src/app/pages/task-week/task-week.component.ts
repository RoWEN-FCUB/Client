import {
  Component, OnInit, Input, ViewChild, ElementRef,
} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Task } from '../../models/Task';
import { NbDialogService } from '@nebular/theme';
import { NewTaskComponent } from '../new-task/new-task.component';
import { NewObsComponent } from '../new-obs/new-obs.component';
import * as moment from 'moment';
import 'moment/min/locales';
import Swal from 'sweetalert2';
import { User } from '../../models/User';
import { TaskByDay } from '../../models/TasksByDay';
import { UserService } from '../../services/user.service';
import { SelectSubsComponent } from '../select-subs/select-subs.component';
import { ActivatedRoute } from '@angular/router';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
@Component({
  selector: 'task-week',
  templateUrl: './task-week.component.html',
  styleUrls: ['./task-week.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskWeekComponent implements OnInit {
  @Input() dia_inicio: Date;
  @Input() dia_fin: Date;
  rango_dias: Date[]; // dias que se encuentran entre el dia inicio y dia fin
  tareas_por_dias: TaskByDay[];
  @ViewChild('range', {static: false}) range: ElementRef;
  user = {name: '', picture: '', id: 0, role: ''};
  tasks: Task[] = []; // lista de tareas
  states = []; // lista de estados de las tareas
  tarea_a_posponer: number;
  tarea_a_repetir: number;
  @Input() usuario_a_mostrar: number = 0;
  subordinados: User[] = [];
  vista_impresion: boolean = false;
  texto_boton_impresion: string = 'Vista de impresión';
  tooltip_boton_impresion: string = 'Mostrar vista de impresión';
  icono_boton_impresion: string = 'printer-outline';
  numero_filas: number[] = [];
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'tabla-imprimir', // the id of html/table element
  };
  constructor(private userService: UserService,
    private taskService: TaskService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private exportAsService: ExportAsService,
    ) {
  }

  ngOnInit() {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      //console.log(this.route.snapshot.paramMap);
      if (this.route.snapshot.paramMap.get('id')) {
        this.usuario_a_mostrar = Number(this.route.snapshot.paramMap.get('id'));
      }
      if (this.route.snapshot.paramMap.get('fecha_inicio')) {
        this.dia_inicio = new Date(this.route.snapshot.paramMap.get('fecha_inicio'));
      }
      if (this.route.snapshot.paramMap.get('fecha_fin')) {
        this.dia_fin = new Date(this.route.snapshot.paramMap.get('fecha_fin'));
        this.getTaskinRange();
      }
      this.getSub();
      if (this.usuario_a_mostrar === 0) {
        this.usuario_a_mostrar = this.user.id;
      }
      //usr.unsubscribe();
    });
  }

  export() {
    this.exportAsService.save(this.exportAsConfig, 'Plan de trabajo').subscribe(() => {
      // save started
    });
  }

  tooglePrintEdit() {
    this.vista_impresion = !this.vista_impresion;
    if (!this.vista_impresion) {
      this.texto_boton_impresion = 'Vista de impresión';
      this.tooltip_boton_impresion = 'Mostrar vista de impresión';
      this.icono_boton_impresion = 'printer-outline';
      this.eliminar_dias_relleno();
    } else {
      this.ajustar_perido();
      this.texto_boton_impresion = 'Vista de trabajo';
      this.tooltip_boton_impresion = 'Mostrar vista de trabajo';
      this.icono_boton_impresion = 'browser-outline';
    }
  }

  ajustar_perido() { //ajusta el rango de dias para que empiece un lunes
    let diaD = moment(this.dia_inicio).toDate();
    while (moment(diaD).day() !== 1 && this.tareas_por_dias.length > 5) {
      diaD = moment(diaD).subtract(1, 'days').toDate();
      const tareasDia: TaskByDay = {
        tasks: [],
        tasks_successful: 0,
        tasks_canceled: 0,
        tasks_pendent: 0,
        tasks_failed: 0,
        day: null,
      };
      this.tareas_por_dias = [tareasDia].concat(this.tareas_por_dias);
    }
    this.calcular_filas();
  }

  eliminar_dias_relleno() { // elimina los dias generados para rellenar la semana
    while (this.tareas_por_dias[0].day === null) {
      this.tareas_por_dias.splice(0, 1);
    }
  }

  calcular_filas() {
    this.numero_filas = new Array<number>(Math.trunc(this.tareas_por_dias.length / 7));
    if (this.tareas_por_dias.length % 7 > 0) {
      this.numero_filas = new Array<number>(this.numero_filas.length + 1);
    }
  }

  // GENERA UN ARREGLO CON LAS TAREAS DE CADA DIA EN EL RANGO SELECCIONADO
  generar_rango_dias() {
    this.tareas_por_dias = [];
    let diaD = moment(this.dia_inicio).toDate();
    do {
      let tareasDia: TaskByDay = {
        tasks: [],
        tasks_successful: 0,
        tasks_canceled: 0,
        tasks_pendent: 0,
        tasks_failed: 0,
      };
      tareasDia.day = diaD;
      for (let i = 0; i < this.tasks.length; i++) {
        if (moment(diaD).isBetween(this.tasks[i].fecha_inicio, this.tasks[i].fecha_fin, 'day', '[]')) {
          tareasDia.tasks.push(this.tasks[i]);
          if (this.tasks[i].estado === 'Pendiente') {
            tareasDia.tasks_pendent++;
          } else if (this.tasks[i].estado === 'Cumplida') {
            tareasDia.tasks_successful++;
          } else if (this.tasks[i].estado === 'Incumplida') {
            tareasDia.tasks_failed++;
          } else if (this.tasks[i].estado === 'Cancelada') {
            tareasDia.tasks_canceled++;
          }
        }
      }
      this.tareas_por_dias.push(tareasDia);
      diaD = moment(diaD).add(1, 'days').toDate();
    } while (moment(diaD).isSameOrBefore(this.dia_fin, 'day'));
    this.calcular_filas();
    if (this.vista_impresion) {
      this.ajustar_perido();
    }
  }

  isInConflict(id: number) {
    if (id > 0) {
      const fecha: Date = this.tasks[id - 1].fecha_inicio;
      const duracion: number = this.tasks[id - 1].duracion;
      const diaD = moment.utc(fecha).add(duracion, 'minutes').format();
      if (moment(this.tasks[id].fecha_inicio).isBefore(diaD, 'minute')) {
        return true;
      }
    }
    return false;
  }

  dayofweek(day: Date) {
    return moment(day).locale('es').format('dddd D [de] MMMM');
  }

  today() {
    this.dia_inicio = moment().toDate();
    this.dia_fin = this.dia_inicio;
    this.getTaskinRange();
  }

  nextDay() {
    this.dia_inicio = moment(this.dia_inicio).locale('es').add(1, 'days').toDate();
    this.dia_fin = moment(this.dia_fin).locale('es').add(1, 'days').toDate();
    this.getTaskinRange();
  }

  prevDay() {
    this.dia_inicio = moment(this.dia_inicio).locale('es').subtract(1, 'days').toDate();
    this.dia_fin = moment(this.dia_fin).locale('es').subtract(1, 'days').toDate();
    this.getTaskinRange();
  }

  thisWeek() {
    this.dia_inicio = moment().startOf('isoWeek').toDate();
    this.dia_fin = moment().endOf('isoWeek').toDate();
    this.getTaskinRange();
  }

  thisMonth() {
    this.dia_inicio = moment().startOf('month').toDate();
    this.dia_fin = moment().endOf('month').toDate();
    this.getTaskinRange();
  }

  getSub() {
    this.userService.getSub(this.user.id).subscribe((res: User[]) => {
      this.subordinados = res;
      if (!this.route.snapshot.paramMap.get('id')) {
        this.today();
      }
    });
  }

  cambiarRango(e) {
    if (e.start && e.end) {
      this.dia_inicio = e.start;
      this.dia_fin = e.end;
      this.getTaskinRange();
    }
  }

  copytask(e) {
    if (e.start && e.end) {
      Swal.fire({
        title: 'Confirma que desea repetir la tarea "' + this.tasks[this.tarea_a_repetir].resumen + '"?',
        text: 'Se crearán nuevas tareas desde el ' + moment(e.start).locale('es').format('LL') + ' hasta el ' + moment(e.end).locale('es').format('LL'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí­',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.taskService.copyTask({id: this.tasks[this.tarea_a_repetir].id, startD: e.start, endD: e.end}).subscribe(res => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
            Toast.fire({
              type: 'success',
              title: 'Tarea copiada.',
            });
            this.getTaskinRange();
          });
        }
      });
    }
  }

  openNew() {
    this.dialogService.open(NewTaskComponent, {context: {subordinados:this.subordinados, id_creador: this.user.id, id_usuario: this.usuario_a_mostrar}}).onClose.subscribe(
      (newTask) => {
        if (newTask) {
          newTask.task.nombre_creador = this.user.name;
          this.taskService.saveTask(newTask).subscribe(
            res => {
              this.getTaskinRange();
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
              Toast.fire({
                type: 'success',
                title: 'Tarea creada.',
              });
            },
          );
        }
      },
    );
  }

  /// ASIGNAR TAREA A UN SUBORDINADO
  openSelectSubs(id: number) {
    this.dialogService.open(SelectSubsComponent, {context: {subordinados: this.subordinados, task: this.tasks[id]}}).onClose.subscribe(
      (newTask) => {
        if (newTask) {
          //console.log(newTask);
          newTask.task.id_creador = this.user.id;
          newTask.task.nombre_creador = this.user.name;
          this.taskService.saveTask(newTask).subscribe(
            res => {
              this.getTaskinRange();
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
              Toast.fire({
                type: 'success',
                title: 'Tarea asignada.',
              });
            },
          );
        }
      },
    );
  }

  convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }

  openNewObs(idtarea: number) {
    this.dialogService.open(NewObsComponent, {context: {id_tarea: idtarea}}).onClose.subscribe(
      newobs => {
        if (newobs) {
          this.taskService.saveObserv(newobs).subscribe(
            res => {
              this.getTaskinRange();
            },
          );
        }
      },
    );
  }

  clickposponer(id: number) {// guardo la posicion de la tarea q se va a posponer
    this.tarea_a_posponer = id;
    // console.log(this.tarea_a_posponer);
  }

  clickrepetir(id: number) {
    this.tarea_a_repetir = id;
    let picked_range: HTMLElement = this.range.nativeElement;
    picked_range.click();
  }

  posponer(event) {// cambiarle la fecha a la tarea
    event.value = this.convertUTCDateToLocalDate(event.value);
    this.tasks[this.tarea_a_posponer].fecha_inicio = event.value; // nueva fecha
    this.tasks[this.tarea_a_posponer].fecha_fin = event.value; // nueva fecha
    this.tasks[this.tarea_a_posponer].estado = 'Pendiente';
    //console.log(this.tasks[this.tarea_a_posponer]);
    this.taskService.updateTask(this.tasks[this.tarea_a_posponer].id, this.tasks[this.tarea_a_posponer]).subscribe(res => {
      this.generar_rango_dias();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        type: 'success',
        title: 'Tarea pospuesta para el ' + moment(event.value).locale('es').format('LLL'),
      });
    });
  }

  formatDate(date: Date) {
    const fdate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    return fdate;
  }

  setTaskState(id: number, state: string) {
    Swal.fire({
      title: 'Confirma que desea cambiar el estado de la tarea a ' + state + '?',
      text: 'Una vez cambiado el estado de la tarea no se podrá actualizar!!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.tasks[id].estado = state;
        this.taskService.updateTask(this.tasks[id].id, this.tasks[id]).subscribe(res => {
          this.generar_rango_dias();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          Toast.fire({
            type: 'success',
            title: 'Tarea ' + state,
          });
        });
      }
    });
  }

  formatTime(fecha: Date, duration: number) {
    /*const fdate = new Date(date);
    let hora = fdate.toLocaleTimeString('es-ES', { timeZone: 'UTC', timeZoneName: 'short' });*/
    const duracion = moment.utc(fecha).add(duration, 'minutes').format('LT');
    const hora = moment.utc(fecha).format('LT');
    return hora + ' - ' + duracion;
  }

  getHour(value) {
    if (value == null) { return 0; }
    if (value <= 0) { return 0; }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const hour = (hours > 1) ? hours + " hrs " : hours + " hr ";
    const min = (minutes > 0) ? minutes + " mins" : "";
    //console.log(hour + min);
    return hour + min;
  }

  /// OBTIENE LAS TAREAS DE LA BD EN EL RANGO Y EL USUARIO ESPECIFICADO
  public getTaskinRange() {
    const diai =  this.formatDate(this.dia_inicio);
    const diaf =  this.formatDate(this.dia_fin);
    const tareas = this.taskService.getTasksinRange(this.usuario_a_mostrar, diai, diaf).subscribe(// obtener las tareas del usuario en el rango
      res => {
        //console.log(res);
        this.tasks = res as Task[];
        this.generar_rango_dias();
        //tareas.unsubscribe();
      },
    );
  }
}
