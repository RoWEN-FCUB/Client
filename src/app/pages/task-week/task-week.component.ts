import {
  Component, OnInit, Input, ViewChild, ElementRef,
} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Task } from '../../models/Task';
import { NbDialogService, NbLayoutScrollService} from '@nebular/theme';
import { NewTaskComponent } from '../new-task/new-task.component';
import { NewObsComponent } from '../new-obs/new-obs.component';
import * as moment from 'moment';
import 'moment/min/locales';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { User } from '../../models/User';
import { TaskByDay } from '../../models/TasksByDay';
import { UserService } from '../../services/user.service';
import { SelectSubsComponent } from '../select-subs/select-subs.component';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'task-week',
  templateUrl: './task-week.component.html',
  styleUrls: ['./task-week.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskWeekComponent implements OnInit {
  @Input() dia_inicio: Date;
  @Input() dia_fin: Date;
  rango_dias: Date[]; // dias que se encuentran entre el dia inicio y dia fin
  tareas_por_dias: TaskByDay[];
  @ViewChild('range', {static: false}) range: ElementRef;
  @ViewChild('rangodias', {static: false}) rangodias: ElementRef;
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: ''};
  tasks: Task[] = []; // lista de tareas
  states = []; // lista de estados de las tareas
  tarea_a_posponer: number;
  tarea_a_repetir: number;
  @Input() usuario_a_mostrar: number = 0;
  subordinados: User[] = [];
  numero_filas: number[] = [];
  docDefinition = {};
  table_to_print = [];
  expandir_todas: boolean = true;
  tasktovalidate: number = 0;
  periodoamostrar: string = '';
  pageOffset = {x: 0, y: 0};
  // showbtnup: boolean = false;

  constructor(private userService: UserService,
    private taskService: TaskService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private nbLayoutScrollService: NbLayoutScrollService,
    ) {
  }

  clickShowRange() {
    const picked_range: HTMLElement = this.rangodias.nativeElement;
    picked_range.click();
  }

  ngOnInit() {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      // console.log(token.getPayload());
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
      // usr.unsubscribe();
    });
    this.nbLayoutScrollService.onScroll().subscribe(r => {
      this.nbLayoutScrollService.getPosition().subscribe(p => {
        this.pageOffset = p;
      });
    });
  }

  goTop() {
    this.nbLayoutScrollService.scrollTo(0, 0);
    // this.showbtnup = false;
  }

  expand_tasks(checked: boolean) {
    this.expandir_todas = checked;
  }

  export() {
    this.ajustar_perido();
    this.generateTableToPrint();
  }

  generateTableToPrint() {
    this.table_to_print = []; // tabla final a imprimir
    const usrtoprint = this.user;
    if (this.subordinados.length > 0) {
      for (let i = 0; i < this.subordinados.length; i++) {
        if (this.usuario_a_mostrar === this.subordinados[i].id) {
          usrtoprint.id = this.subordinados[i].id;
          usrtoprint.fullname = this.subordinados[i].fullname;
          usrtoprint.position = this.subordinados[i].position;
          break;
        }
      }
    }
    this.userService.getSup(this.usuario_a_mostrar).subscribe((res: User) => {
       usrtoprint.supname = res.fullname;
       usrtoprint.supposition = res.position;
       let row = []; // cada fila
        for (let i = 0; i < this.numero_filas.length; i++) {
          row = [];
          for (let j = 0; j < 7; j++) {
            // row.push(i * 7 + j);
            let day = {};
            if ((i * 7 + j) < this.tareas_por_dias.length) {
              if (this.tareas_por_dias[i * 7 + j].day) {
                let color = '#eeeeee';
                let dsemana = moment(this.tareas_por_dias[i * 7 + j].day).locale('es').format('dddd D').toLocaleUpperCase();
                if (j > 4) {
                  color = '#b0a9a9';
                  dsemana = moment(this.tareas_por_dias[i * 7 + j].day).locale('es').format('ddd D').toLocaleUpperCase();
                }
                day = {
                  table: {
                    // headerRows: 1,
                    widths: ['*'],
                    body: [[{
                      text: dsemana,
                      fillColor: color,
                      border: [false, false, false, true],
                      style: {bold: true, alignment: 'center'},
                    }],
                    [{
                      border: [false, false, false, false],
                      ol: this.tareas_por_dias[i * 7 + j].tasks.filter(function(task) {
                        if (task.estado !== 'Cancelada' && task.estado !== 'Pospuesta') {
                          return true;
                        } else {
                          return false;
                        }
                      }).map(function(task) {
                        return task.resumen;
                      }),
                    }]],
                  },
                };
              }
            }
            row.push(day);
          }
          this.table_to_print.push(row);
        }
        // console.log(usrtoprint);
        // console.log(this.table_to_print);
        this.docDefinition = {
          info: {
            title: 'Plan de trabajo de ' + this.user.fullname,
          },
          footer: function(currentPage, pageCount) {
            return {
              text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
              alignment: 'right',
              margin: [2, 2, 5, 2],
              fontSize: 10,
            };
          },
          pageSize: 'LETTER',
          pageOrientation: 'landscape',
          content: [
            {
              columns: [
                {
                  image: 'data:image/png;base64,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k5OTk5Mbdjk5OTshK6kfdwLo7O4+1a6wPXVAwZRQjreWiad8oHJycvY58xviny3swol1Ba5BEaXmueVNufzJycnJmVxM+nYHOTk5OTk5OTk5OTk5OTsnz7HLycnJycnJycnJycnJDbucnJycnJycnJycnJyc3LDLycnJycnJycnJycnJyQ27nJycnJycnJycnJyc3LDLycnJycnJycnJycnJyQ27nJycnJycnJycnJycnNywy8nJycnJycnJycnJyckNu5ycnJycnJycnJycnNywy8nJycnJycnJycnJyckNu5ycnJycnJycnJycnJzcsMvJycnJycnJycnJycnJDbucnJycnJycnJycnJzcsMvJycnJycnJycnJycnJDbucnJycnJycnJycnJyc3LDLycnJycnJycnJycnJyQ27nJycnJycnJycnJyc3LDLycnJycnJycnJycnJyQ27nJycnJycnJycnJycnNywy8nJycnJycnJycnJyckNu5ycnJycnJycnJycnNywy8nJycnJycnJycnJyckNu5ycnJycnJycnJycnJzcsMvJycnJycnJycnJycnJDbucnJycnJycnJycnJzcsMvJycnJycnJycnJycnJDbucnJycnJycnJycnJyc3LDLycnJycnJycnJycnJDbucnJycnJycnJycnJyc3LDLycnJycnJycnJycnJyQ27nJycnJycnJycnJycnNywy8nJycnJycnJycnJyQ27nJycnJycnJycnJycnNywy8nJycnJycnJycnJyZlg/v8Al1EnHh3gfdsAAAAASUVORK5CYII=',
                  width: 168,
                  height: 60,
                },
                [
                  {
                    columns: [
                      {text: 'Plan de Trabajo de:', fontSize: 15, width: 'auto'},
                      {text: usrtoprint.fullname, fontSize: 15, width: 'auto', style: {bold: true}, decoration: 'underline'},
                    ],
                    columnGap: 10,
                  },
                  {
                    columns: [
                      {text: 'Cargo:', fontSize: 15, width: 'auto'},
                      {text: usrtoprint.position, fontSize: 15, width: 'auto', style: {bold: true}, decoration: 'underline'},
                    ],
                    columnGap: 10,
                  },
                  {
                    columns: [
                      {text: 'Período:', fontSize: 15, width: 'auto'},
                      // tslint:disable-next-line: max-line-length
                      {text: moment(this.dia_inicio).locale('es').format('LL'), fontSize: 15, width: 'auto', style: {bold: true}, decoration: 'underline'},
                      {text: 'al', fontSize: 15, width: 'auto'},
                      {text: moment(this.dia_fin).locale('es').format('LL'), fontSize: 15, width: 'auto', style: {bold: true}, decoration: 'underline'},
                    ],
                    columnGap: 5,
                  },
                ],
              ],
            },
            {
              table: {
                widths: ['*', '*', '*', '*', '*', 60, 60],
                body: this.table_to_print,
              },
              layout: {
                paddingLeft: function(i, node) { return 0; },
                paddingRight: function(i, node) { return 0; },
                paddingTop: function(i, node) { return 0; },
                paddingBottom: function(i, node) { return 2; },
              },
            },
            {
              alignment: 'left',
              columns: [
                {
                  width: 'auto',
                  text: 'Total de tareas planificadas para el período: ',
                  fontSize: 14,
                },
                {
                  width: 'auto',
                  text: this.tasks.length,
                  fontSize: 14,
                  style: {bold: true},
                },
              ],
              columnGap: 10,
              margin: [0, 20],
            },
            {
              alignment: 'left',
              columns: [
                {
                  width: 'auto',
                  text: 'Elaborado por:',
                  fontSize: 14,
                },
                {
                  width: 300,
                  text: usrtoprint.fullname,
                  fontSize: 14,
                  style: {bold: true},
                  decoration: 'overline',
                },
                {
                  width: 'auto',
                  text: 'Apobado por: ',
                  fontSize: 14,
                },
                {
                  width: 'auto',
                  text: usrtoprint.supname,
                  fontSize: 14,
                  style: {bold: true},
                  decoration: 'overline',
                },
              ],
              columnGap: 8,
              margin: [0, 30, 0, 0],
            },
            {
              alignment: 'left',
              columns: [
                {
                  width: 485,
                  text: usrtoprint.position,
                  fontSize: 14,
                  style: {bold: true},
                  margin: [98, 5],
                },
                {
                  width: 'auto',
                  text: usrtoprint.supposition,
                  fontSize: 14,
                  style: {bold: true},
              },
              ],
              columnGap: 10,
            }
          ],
          pageMargins: [5, 25, 5, 25],
        };
        this.eliminar_dias_relleno();
        const inicio = moment(this.dia_inicio).format('DD/MM/YYYY').toString();
        const fin = moment(this.dia_fin).format('DD/MM/YYYY').toString();
        pdfMake.createPdf(this.docDefinition).open('PT ' + this.user.fullname + ' ' + inicio + '-' + fin);
    });
    // console.log(usrtoprint);

  }

  ajustar_perido() { // ajusta el rango de dias para que empiece un lunes
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

  calcular_filas() { // calcula la cantidad de semanas a mostrar
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
      const tareasDia: TaskByDay = {
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
      if (this.subordinados.length > 0) {
        this.subordinados.splice(0, 0, {id: this.user.id, user: this.user.name});
        // console.log(this.subordinados);
      }
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
        // tslint:disable-next-line: max-line-length
        text: 'Se crearán nuevas tareas desde el ' + moment(e.start).locale('es').format('LL') + ' hasta el ' + moment(e.end).locale('es').format('LL'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí­',
        cancelButtonText: 'No',
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          this.taskService.copyTask({id: this.tasks[this.tarea_a_repetir].id, startD: e.start, endD: e.end}).subscribe(res => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 3000,
            });
            Toast.fire({
              icon: 'success',
              title: 'Tarea copiada.',
            } as SweetAlertOptions);
            this.getTaskinRange();
          });
        }
      });
    }
  }

  openNew(fecha_i?: Date) {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewTaskComponent, {context: {subordinados: this.subordinados, id_creador: this.user.id, id_usuario: this.usuario_a_mostrar, fecha: new FormControl(fecha_i)}}).onClose.subscribe(
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
                timerProgressBar: true,
                timer: 3000,
              });
              Toast.fire({
                icon: 'success',
                title: 'Tarea creada.',
              } as SweetAlertOptions);
            },
          );
        }
      },
    );
  }

  openEdit(id: number) {
    let range = 'range';
    let date;
    // console.log(moment(this.tasks[id].fecha_inicio).toLocaleString());
    // tslint:disable-next-line: max-line-length
    const hour = [moment.parseZone(this.tasks[id].fecha_inicio).local(true).format(), moment.parseZone(this.tasks[id].fecha_inicio).local(true).add(this.tasks[id].duracion, 'minutes').format()];
    // console.log(hour);
    if (moment(this.tasks[id].fecha_inicio).isSame(this.tasks[id].fecha_fin)) {
      range = 'single';
      date = moment(this.tasks[id].fecha_inicio).toDate();
    } else {
      date = [this.tasks[id].fecha_inicio, this.tasks[id].fecha_fin];
    }
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewTaskComponent, {context: {editing: true, id_creador: this.user.id, id_usuario: this.usuario_a_mostrar, task: this.tasks[id], rango: range, hora: new FormControl(hour), fecha: new FormControl(date)}}).onClose.subscribe(
      (newTask) => {
        if (newTask) {
          // newTask.task.nombre_creador = this.user.name;
          this.taskService.updateTask(this.tasks[id].id, newTask.task).subscribe(
            res => {
              this.getTaskinRange();
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
              });
              Toast.fire({
                icon: 'success',
                title: 'Tarea actualizada.',
              } as SweetAlertOptions);
            },
          );
        }
      },
    );
  }

  validateTask(id: number) {
    this.tasks[id].validada = true;
    this.taskService.updateTask(this.tasks[id].id, this.tasks[id]).subscribe(
      res => {
        this.getTaskinRange();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        Toast.fire({
          icon: 'success',
          title: 'Tarea validada.',
        } as SweetAlertOptions);
      },
    );
  }

  countTaskToValidate() {
    let count = 0;
    for (let i = 0; i < this.tasks.length; i++) {
      if (!this.tasks[i].validada) {
        count++;
      }
    }
    return count;
  }

  validateAllTasks() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.tasktovalidate === 0) {
      Toast.fire({
        icon: 'error',
        title: 'No existen tareas para validar en el período seleccionado.',
      } as SweetAlertOptions);
    } else {
      Swal.fire({
        title: '¿Confirma que validar todas las tareas del período seleccionado?',
        text: 'Se validarán ' + this.tasktovalidate + ' tareas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí­',
        cancelButtonText: 'No',
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          this.taskService.validateTask({userid: this.usuario_a_mostrar, startD: this.dia_inicio, endD: this.dia_fin}).subscribe(res => {
            this.getTaskinRange();
            Toast.fire({
              icon: 'success',
              title: 'Tareas validadas.',
            } as SweetAlertOptions);
          });
        }
      });
    }
  }

  /// ASIGNAR TAREA A UN SUBORDINADO
  openSelectSubs(id: number) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        id = i;
        break;
      }
    }
    this.dialogService.open(SelectSubsComponent, {context: {subordinados: this.subordinados, task: this.tasks[id]}}).onClose.subscribe(
      (newTask) => {
        if (newTask) {
          // console.log(newTask);
          newTask.task.id_creador = this.user.id;
          newTask.task.nombre_creador = this.user.name;
          this.taskService.saveTask(newTask).subscribe(
            res => {
              this.getTaskinRange();
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
              });
              Toast.fire({
                icon: 'success',
                title: 'Tarea asignada.',
              } as SweetAlertOptions);
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
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        id = i;
        break;
      }
    }
    this.tarea_a_posponer = id;
    // console.log(this.tarea_a_posponer);
  }

  clickrepetir(id: number) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        id = i;
        break;
      }
    }
    this.tarea_a_repetir = id;
    const picked_range: HTMLElement = this.range.nativeElement;
    picked_range.click();
  }

  posponer(event) {// cambiarle la fecha a la tarea
    event.value = this.convertUTCDateToLocalDate(event.value);
    const olddate = this.tasks[this.tarea_a_posponer].fecha_inicio;
    this.tasks[this.tarea_a_posponer].fecha_inicio = event.value;
    this.tasks[this.tarea_a_posponer].fecha_fin = event.value;
    this.tasks[this.tarea_a_posponer].estado = 'Pospuesta';
    this.taskService.updateTask(this.tasks[this.tarea_a_posponer].id, this.tasks[this.tarea_a_posponer]).subscribe(res => {
      this.taskService.copyTask({id: this.tasks[this.tarea_a_posponer].id, startD: event.value, endD: event.value}).subscribe(resp => {
        this.tasks[this.tarea_a_posponer].fecha_inicio = olddate;
        this.tasks[this.tarea_a_posponer].fecha_fin = olddate;
        this.taskService.updateTask(this.tasks[this.tarea_a_posponer].id, this.tasks[this.tarea_a_posponer]).subscribe(respo => {
          this.getTaskinRange();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Tarea pospuesta para el ' + moment(event.value).locale('es').format('LLL'),
          } as SweetAlertOptions);
        });
      });
    });
  }

  formatDate(date: Date) {
    const fdate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    return fdate;
  }

  setTaskState(id: number, state: string) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        id = i;
        break;
      }
    }
    Swal.fire({
      title: 'Confirma que desea cambiar el estado de la tarea a ' + state + '?',
      text: 'Una vez cambiado el estado de la tarea no se podrá actualizar!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.tasks[id].estado = state;
        this.taskService.updateTask(this.tasks[id].id, this.tasks[id]).subscribe(res => {
          this.generar_rango_dias();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Tarea ' + state,
          } as SweetAlertOptions);
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
    const hour = (hours > 1) ? hours + ' hrs ' : hours + ' hr ';
    const min = (minutes > 0) ? minutes + ' mins' : '';
    // console.log(hour + min);
    return hour + min;
  }

  /// OBTIENE LAS TAREAS DE LA BD EN EL RANGO Y EL USUARIO ESPECIFICADO
  public getTaskinRange() {
    const diai =  this.formatDate(this.dia_inicio);
    const diaf =  this.formatDate(this.dia_fin);
    this.periodoamostrar = diai.substr(0, diai.indexOf(' '));
    if (diai !== diaf) {
      this.periodoamostrar += ' ~ ' + diaf.substr(0, diaf.indexOf(' '));
    }
    // tslint:disable-next-line: max-line-length
    const tareas = this.taskService.getTasksinRange(this.usuario_a_mostrar, diai, diaf).subscribe(// obtener las tareas del usuario en el rango
      res => {
        // console.log(res);
        this.tasks = res as Task[];
        this.generar_rango_dias();
        this.tasktovalidate = this.countTaskToValidate();
        // tareas.unsubscribe();
      },
    );
  }

  deleteTask(id: number) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        id = i;
        break;
      }
    }
    Swal.fire({
      title: '¿Confirma que desea eliminar la tarea ' + this.tasks[id].resumen + '?',
      text: 'Una vez eliminada la tarea no se podrá recuperar!!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.taskService.deleteTask(this.tasks[id].id).subscribe(res => {
          this.getTaskinRange();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Tarea eliminada.',
          } as SweetAlertOptions);
        });
      }
    });
  }
}
