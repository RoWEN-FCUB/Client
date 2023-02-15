import { Component, OnInit } from '@angular/core';
import { ERecord } from '../../models/ERecord';
import { Company } from '../../models/Company';
import { EService } from '../../models/EService';
import { NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import 'moment/min/locales';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { EnergyService } from '../../services/energy.service';
import { CompanyService } from '../../services/company.service';
import { EserviceService } from '../../services/eservice.service';
import { NewErecordComponent } from '../new-erecord/new-erecord.component';
import { EnergyPlansComponent } from '../energy-plans/energy-plans.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { OwlDateTimeComponent /*, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE*/ } from '@danielmoncada/angular-datetime-picker';
import { Moment } from 'moment';
import { Workbook } from 'exceljs';
import * as fsaver from 'file-saver';
// import ipserver from '../../ipserver';
import {HttpClient} from '@angular/common/http';

// const moment = (_moment as any).default ? (_moment as any).default : _moment;
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
  public totalPlan: number = 0;
  totalConsume: number = 0;
  totalYearPlan: number = 0;
  totalYearConsume: number = 0;
  promConsume: number = 0;
  selectedMonth: number;
  selectedYear: number;
  show: boolean = false;
  company: Company = {};
  services: EService[] = [];
  selectedService: number = -1;
  showstring: string[] = ['mes', 'año'];
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_emp: 0};
  months: {Mes: number, Plan: number, Consumo: number, PlanAcumulado?: number, RealAcumulado?: number}[] = [];
  // opciones de la grafica
  showgraph: boolean = false;
  multi: any[] = [];
  multi2: any[] = [];
  view: any[] = [900, 250];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Días';
  showYAxisLabel = true;
  yAxisLabel = 'Consumo de energía (KW)';
  timeline = false;
  autoScale = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  yscaleMax = 100;
  yscaleMax2 = 1000;
  // // //

  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private energyService: EnergyService, private dialogService: NbDialogService, private authService: NbAuthService,
    private companyService: CompanyService, private eserviceService: EserviceService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.currentYear = moment().get('year').toString();
      this.currentMonth = moment().locale('es').format('MMMM');
      this.selectedYear = moment().get('year');
      this.selectedMonth = moment().get('month');
      this.companyService.getOne(this.user.id_emp).subscribe((res: Company) => {
        this.company = res;
      });
      this.eserviceService.userServices(this.user.id).subscribe((res: EService[]) => {
        this.services = res;
        if (res.length > 1) {
          this.selectedService = -1;
        } else {
          this.selectedService = 0;
        }
        if (res.length > 0) {
          this.generar_rango_inicial(false);
          this.consumo_por_meses();
        }
      });
    });
  }

  blockrecord(index: number) {
    if (Number(this.selectedService) > -1) {
      Swal.fire({
        title: 'Confirma que desea bloquear el registro?',
        // tslint:disable-next-line: max-line-length
        text: 'Una vez bloqueado no podrá modificarlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí­',
        cancelButtonText: 'No',
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          this.energyService.blockERecord(this.erecords[index].id).subscribe(res => {
            this.generar_rango_inicial(false);
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Confirma que desea bloquear TODOS los registros de este día?',
        // tslint:disable-next-line: max-line-length
        text: 'Una vez bloqueados los demás usuarios no podrán modificarlos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí­',
        cancelButtonText: 'No',
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          this.blockallrecords(index);
        }
      });
    }
  }

  unblockrecord(index: number) {
    if (Number(this.selectedService) > -1) {
      this.energyService.unblockERecord(this.erecords[index].id).subscribe(res => {
        this.generar_rango_inicial(false);
      });
    } else {
      this.unblockallrecords(index);
    }
  }

  blockallrecords(index: number) {
    this.energyService.blockAllERecords(this.user.id, moment.utc(this.erecords[index].fecha).format('YYYY-MM-DD')).subscribe(res => {
      this.generar_rango_inicial(false);
    });
  }

  unblockallrecords(index: number) {
    this.energyService.unblockAllERecords(this.user.id, moment.utc(this.erecords[index].fecha).format('YYYY-MM-DD')).subscribe(res => {
      this.generar_rango_inicial(false);
    });
  }

  checkBloquedBeforeExport(index: number) {
    if (Number(this.selectedService) === -1) {
      // tslint:disable-next-line: max-line-length
      this.energyService.unblockedServices(this.user.id, moment.utc(this.erecords[index].fecha).format('YYYY-MM-DD')).subscribe((res: {nombre: string, consumo: number}[]) => {
        if (res.length > 0) {
          let list = '<ul class="list-group list-group-flush" style="padding-left: 0pt; text-align: left;">';
          for (let i = 0; i < res.length; i++) {
            list += '<li class="list-group-item">' + res[i].nombre + ' - Consumo: ' + res[i].consumo + ' KW</li>';
          }
          list += '</ul>';
          Swal.fire({
            // tslint:disable-next-line: max-line-length
            // title: 'Los siguientes servicios no están bloqueados para este día y podrían ser modificados. Desea bloquearlos antes de exportar el Modelo 5?',
            html: '<div class="row"><div class="col text-justify">Los siguientes servicios no están bloqueados para este día y podrían ser modificados. ¿Desea bloquearlos antes de exportar el Modelo 5?</div></div><div class="row"><div class="col d-flex justify-content-left">' + list + '</div></div>',
            icon: 'warning',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí­',
            cancelButtonText: 'No',
          } as SweetAlertOptions).then((result) => {
            if (result.value) {
              this.blockallrecords(index);
            }
            this.exportLocalXlsx(index);
          });
        }
      });
    } else {
      this.exportLocalXlsx(index);
    }
  }

  async exportLocalXlsx(index: number) {
    const workBook: Workbook = new Workbook();
    const subscription = this.http.get('./assets/Modelo5.xlsx', { responseType: 'blob' })
    .subscribe(value => {
      // tslint:disable-next-line: max-line-length
      this.energyService.getEReadingByServices(this.user.id, moment.utc(this.erecords[index].fecha).format('YYYY-MM-DD')).subscribe((res: any[]) => {
        // console.log(res);
        const blob: Blob = value;
        const reader = new FileReader();
        const comp = this.company;
        const fecha = this.erecords[index].fecha;
        const selserv = this.selectedService;
        let servname = '';
        if (selserv === -1) {
          servname = this.company.nombre;
        } else {
          servname = this.services[selserv].nombre;
        }
        reader.onload = function (e: any) {
          const contents = e.target.result;
          workBook.xlsx.load(contents).then(data => {
            for (let i = 0; i < res.length; i++) {
              let pos: number;
              if (selserv > -1) {
                pos = selserv;
              } else {
                pos = i;
              }
              const d_plan = res[pos].plan;
              const d_real = res[pos].consumo;
              const ppland = res[pos].plan_hpicd;
              const pplann = res[pos].plan_hpicn;
              let preald = '';
              if (res[i].pico_diurno) {
                preald = (res[pos].lectura_hpicd2 - res[pos].lectura_hpicd1).toFixed(1);
              }
              let prealn = '';
              if (res[i].pico_nocturno) {
                prealn = (res[pos].lectura_hpicn2 - res[pos].lectura_hpicn1).toFixed(1);
              }
              let bitacora = '';
              if (res[i].bitacora) {
                bitacora = 'X';
              }
              let triple_registro = '';
              if (res[i].triple_registro) {
                triple_registro = 'X';
              }
              let acomodo_carga = '';
              if (res[i].aplica_acomodo) {
                acomodo_carga = 'X';
              }
              // const edate = moment.utc(fecha.toString().substr(0, fecha.toString().indexOf('T'))).format('DD-MM-YYYY');
              const fdate = moment.utc(fecha.toString().substring(0, fecha.toString().indexOf('T'))).locale('es').format('DD/MM/YYYY');
              const month = moment.utc(fecha).locale('es').format('MMMM').toUpperCase();
              workBook.worksheets[0].getCell(1, 6).value = month;
              workBook.worksheets[0].getCell(1, 8).value = fdate;
              workBook.worksheets[0].getCell(1, 10).value = 'OACE: ' + comp.oace;
              workBook.worksheets[0].getCell(i + 3, 1).value = i + 1;
              workBook.worksheets[0].getCell(i + 3, 2).value = res[pos].provincia;
              workBook.worksheets[0].getCell(i + 3, 3).value = res[pos].municipio;
              workBook.worksheets[0].getCell(i + 3, 4).value = comp.oace;
              workBook.worksheets[0].getCell(i + 3, 5).value = comp.osde;
              workBook.worksheets[0].getCell(i + 3, 6).value = res[pos].codcli;
              workBook.worksheets[0].getCell(i + 3, 7).value = res[pos].control;
              workBook.worksheets[0].getCell(i + 3, 8).value = res[pos].ruta;
              workBook.worksheets[0].getCell(i + 3, 9).value = res[pos].folio;
              workBook.worksheets[0].getCell(i + 3, 10).value = res[pos].nombre;
              workBook.worksheets[0].getCell(i + 3, 11).value = comp.siglas;
              workBook.worksheets[0].getCell(i + 3, 12).value = comp.reup;
              workBook.worksheets[0].getCell(i + 3, 13).value = res[pos].reup;
              workBook.worksheets[0].getCell(i + 3, 14).value = res[pos].plan_total;
              workBook.worksheets[0].getCell(i + 3, 15).value = res[pos].plan_acumulado;
              workBook.worksheets[0].getCell(i + 3, 16).value = res[pos].real_acumulado;
              workBook.worksheets[0].getCell(i + 3, 17).model.result = undefined; // para que recalcule las formulas
              workBook.worksheets[0].getCell(i + 3, 18).model.result = undefined;
              workBook.worksheets[0].getCell(i + 3, 19).value = d_plan;
              workBook.worksheets[0].getCell(i + 3, 20).value = d_real;
              workBook.worksheets[0].getCell(i + 3, 21).model.result = undefined;
              workBook.worksheets[0].getCell(i + 3, 22).model.result = undefined;
              workBook.worksheets[0].getCell(i + 3, 23).value = bitacora;
              workBook.worksheets[0].getCell(i + 3, 24).value = triple_registro;
              workBook.worksheets[0].getCell(i + 3, 25).value = acomodo_carga;
              workBook.worksheets[0].getCell(i + 3, 26).value = ppland;
              workBook.worksheets[0].getCell(i + 3, 27).value = preald;
              workBook.worksheets[0].getCell(i + 3, 28).model.result = undefined;
              workBook.worksheets[0].getCell(i + 3, 29).model.result = undefined;
              workBook.worksheets[0].getCell(i + 3, 30).value = pplann;
              workBook.worksheets[0].getCell(i + 3, 31).value = prealn;
              workBook.worksheets[0].getCell(i + 3, 32).model.result = undefined;
              workBook.worksheets[0].getCell(i + 3, 33).model.result = undefined;
              workBook.worksheets[0].getCell(i + 3, 34).value = res[pos].total_desconectivos;
              workBook.worksheets[0].getCell(i + 3, 35).value = res[pos].desc_gen_dia;
              workBook.worksheets[0].getCell(i + 3, 36).value = res[pos].desc_parc_dia;
              workBook.worksheets[0].getCell(i + 3, 37).value = res[pos].desc_gen_noche;
              workBook.worksheets[0].getCell(i + 3, 38).value = res[pos].desc_parc_noche;
              if (selserv > -1) {
                break;
              }
            }
            workBook.xlsx.writeBuffer().then(data1 => {
              const blobUpdate = new Blob([data1], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              // tslint:disable-next-line: max-line-length
              fsaver.saveAs(blobUpdate, 'Modelo 5 ' + servname + ' ' + moment().format('DD-MM-YYYY') + ' (Consumo del ' + moment.utc(fecha.toString().substring(0, fecha.toString().indexOf('T'))).format('DD-MM-YYYY') + ').xlsx');
            });
          });
        };
        reader.readAsArrayBuffer(blob);
      });
    });
  }

  onSelect(event) {
    // console.log(event);
    const i: number = Number(event.name) - 1;
    this.openNew(i);
  }

  toogleGraph() {
    this.showgraph = !this.showgraph;
  }

  toogleShow(event) {
    this.show = !this.show;
    if (this.show)
    this.consumo_por_meses();
  }

  chosenMonthHandler( normalizedMonth: Moment, datepicker: OwlDateTimeComponent<Moment> ) {
    // console.log(normalizedMonth);
    this.currentYear = moment(normalizedMonth).get('year').toString();
    this.currentMonth = moment(normalizedMonth).locale('es').format('MMMM');
    this.selectedYear = moment(normalizedMonth).get('year');
    this.selectedMonth = moment(normalizedMonth).get('month');
    datepicker.close();
    this.generar_rango_inicial(false);
  }

  chosenYearHandler( normalizedMonth: Moment, datepicker: OwlDateTimeComponent<Moment> ) {
    // console.log(normalizedMonth);
    if (this.show) {
      this.currentYear = moment(normalizedMonth).get('year').toString();
      this.selectedYear = moment(normalizedMonth).get('year');
      datepicker.close();
      this.consumo_por_meses();
    }
  }

  changeSelectedService() {
    this.selectedService = Number(this.selectedService);
    this.generar_rango_inicial(false);
    if (this.show)
    this.consumo_por_meses();
  }

  deleteERecord(id: number) {
    Swal.fire({
      title: 'Confirma que desea eliminar el registro?',
      text: 'Se eliminarán todos sus datos del sistema, incluyendo el plan diario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        this.energyService.deleteERecord(id).subscribe(res => {
          Toast.fire({
            icon: 'success',
            title: 'Registro eliminado.',
          } as SweetAlertOptions);
          this.generar_rango_inicial(true);
        });
      }
    });
  }

  consumo_por_meses() {
    this.selectedService = Number(this.selectedService);
    if (this.selectedService === -1) {
      this.energyService.getMonthsAllServices(this.selectedYear, this.user.id).subscribe(res => {
        this.months = res as {Mes: number, Plan: number, Consumo: number}[];
        this.totalYearPlan = 0;
        this.totalYearConsume = 0;
        const consumos = [];
        const planes = [];
        for (let i = 0; i < this.months.length; i++) {
          if (i === 0) {
            this.months[i].PlanAcumulado = this.months[i].Plan;
            this.months[i].RealAcumulado = this.months[i].Consumo;
          } else {
            this.months[i].PlanAcumulado = this.months[i].Plan + this.months[i - 1].PlanAcumulado;
            this.months[i].RealAcumulado = this.months[i].Consumo + this.months[i - 1].RealAcumulado;
          }
          if (this.months[i].Plan > this.yscaleMax2) {
            this.yscaleMax2 = this.months[i].Plan + 100;
          }
          // tslint:disable-next-line: max-line-length
          consumos.push({name : moment().locale('es').set('month', this.months[i].Mes - 1).format('MMMM').toUpperCase(), value : this.months[i].Consumo});
          // tslint:disable-next-line: max-line-length
          planes.push({name : moment().locale('es').set('month', this.months[i].Mes - 1).format('MMMM').toUpperCase(), value : this.months[i].Plan});
          this.totalYearPlan += this.months[i].Plan;
          this.totalYearConsume += this.months[i].Consumo;
        }
        // tslint:disable-next-line: max-line-length
        this.multi2 = [{name: 'Plan ' + this.totalYearPlan + ' KW', series: planes}, {name: 'Consumo ' + this.totalYearConsume + ' KW', series: consumos}];
        // console.log(this.months);
      });
    } else {
      this.energyService.getMonths(this.selectedYear, this.services[this.selectedService].id).subscribe(res => {
        this.months = res as {Mes: number, Plan: number, Consumo: number}[];
        this.totalYearPlan = 0;
        this.totalYearConsume = 0;
        const consumos = [];
        const planes = [];
        for (let i = 0; i < this.months.length; i++) {
          if (i === 0) {
            this.months[i].PlanAcumulado = this.months[i].Plan;
            this.months[i].RealAcumulado = this.months[i].Consumo;
          } else {
            this.months[i].PlanAcumulado = this.months[i].Plan + this.months[i - 1].PlanAcumulado;
            this.months[i].RealAcumulado = this.months[i].Consumo + this.months[i - 1].RealAcumulado;
          }
          if (this.months[i].Plan > this.yscaleMax2) {
            this.yscaleMax2 = this.months[i].Plan + 100;
          }
          // tslint:disable-next-line: max-line-length
          consumos.push({name : moment().locale('es').set('month', this.months[i].Mes - 1).format('MMMM').toUpperCase(), value : this.months[i].Consumo});
          // tslint:disable-next-line: max-line-length
          planes.push({name : moment().locale('es').set('month', this.months[i].Mes - 1).format('MMMM').toUpperCase(), value : this.months[i].Plan});
          this.totalYearPlan += this.months[i].Plan;
          this.totalYearConsume += this.months[i].Consumo;
        }
        // tslint:disable-next-line: max-line-length
        this.multi2 = [{name: 'Plan ' + this.totalYearPlan + ' KW', series: planes}, {name: 'Consumo ' + this.totalYearConsume + ' KW', series: consumos}];
        // console.log(this.months);
      });
    }
  }

  generar_rango_inicial(adjust: boolean) {
    this.totalPlan = 0;
    this.totalConsume = 0;
    this.erecords = [];
    let fday = moment().set('year', this.selectedYear).set('month', this.selectedMonth).startOf('month').toDate();
    // fday.setTime(fday.getTime() + fday.getTimezoneOffset() * 60 * 1000);
    const lday = moment().set('year', this.selectedYear).set('month', this.selectedMonth).endOf('month').toDate();
    while (moment(fday).isSameOrBefore(lday, 'day')) {
      const erecord: ERecord = {
        fecha: fday,
        plan: 0,
        consumo: 0,
        lectura: 0,
        lectura_hpicd1: 0,
        lectura_hpicd2: 0,
        lectura_hpicn1: 0,
        lectura_hpicn2: 0,
        planacumulado: 0,
        realacumulado: 0,
        plan_hpicd: 0,
        plan_hpicn: 0,
        id_serv: (this.selectedService > -1) ? this.services[this.selectedService].id : -1,
        bloqueado: false,
      };
      this.erecords.push(erecord);
      fday = moment(fday).locale('es').add(1, 'days').toDate();
    }
    if (this.selectedService === -1) {
      // tslint:disable-next-line: max-line-length
      this.energyService.getEAllServices(this.selectedYear, this.selectedMonth + 1, this.user.id).subscribe((res: ERecord[]) => {
        // console.log(this.erecords);
        let last = 0;
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
        // console.log(this.erecords);
        for (let i = 0; i < this.erecords.length; i++) {
          this.totalConsume += this.erecords[i].consumo;
          this.totalPlan += this.erecords[i].plan;
          if (this.erecords[i].plan > this.yscaleMax) {
            this.yscaleMax = this.erecords[i].plan + 10;
          }
          if (i > 0) {
            this.erecords[i].planacumulado = this.erecords[i].plan + this.erecords[i - 1].planacumulado;
          } else {
            this.erecords[i].planacumulado = this.erecords[i].plan;
          }
          if (this.erecords[i].consumo) {
            this.erecords[i].realacumulado = this.erecords[i].consumo + this.erecords[last].realacumulado;
            last = i;
          }
        }
        const consumos = [];
        const planes = [];
        for (let i = 0; i < this.erecords.length; i++) {
          if (this.erecords[i].consumo > 0) {
            consumos.push({name : (i + 1).toString(), value : this.erecords[i].consumo});
          }
          if (this.erecords[i].plan > 0) {
            planes.push({name : (i + 1).toString(), value : this.erecords[i].plan});
          }
        }
        if (consumos.length > 0) {
          this.promConsume = Math.round(this.totalConsume / (last + 1));
        }
        // tslint:disable-next-line: max-line-length
        this.multi = [{name: 'Plan ' + this.totalPlan + ' KW', series: planes}, {name: 'Consumo ' + this.totalConsume + ' KW', series: consumos}];
        if (adjust) {
          this.consume_adjust();
        }
      });
    } else {
      // tslint:disable-next-line: max-line-length
      this.energyService.getERecords(this.selectedYear, this.selectedMonth + 1, this.services[this.selectedService].id).subscribe((res: ERecord[]) => {
        // console.log(this.erecords);
        let last = 0;
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
        // console.log(this.erecords);
        for (let i = 0; i < this.erecords.length; i++) {
          this.totalConsume += this.erecords[i].consumo;
          this.totalPlan += this.erecords[i].plan;
          if (this.erecords[i].plan > this.yscaleMax) {
            this.yscaleMax = this.erecords[i].plan + 10;
          }
          if (i > 0) {
            this.erecords[i].planacumulado = this.erecords[i].plan + this.erecords[i - 1].planacumulado;
          } else {
            this.erecords[i].planacumulado = this.erecords[i].plan;
          }
          if (this.erecords[i].lectura) {
            this.erecords[i].realacumulado = this.erecords[i].consumo + this.erecords[last].realacumulado;
            last = i;
          }
        }
        const consumos = [];
        const planes = [];
        for (let i = 0; i < this.erecords.length; i++) {
          if (this.erecords[i].consumo > 0) {
            consumos.push({name : (i + 1).toString(), value : this.erecords[i].consumo});
          }
          if (this.erecords[i].plan > 0) {
            planes.push({name : (i + 1).toString(), value : this.erecords[i].plan});
          }
        }
        if (consumos.length > 0) {
          this.promConsume = Math.round(this.totalConsume / (last + 1));
        }
        // tslint:disable-next-line: max-line-length
        this.multi = [{name: 'Plan ' + this.totalPlan + ' KW', series: planes}, {name: 'Consumo ' + this.totalConsume + ' KW', series: consumos}];
        if (adjust) {
          this.consume_adjust();
        }
      });
    }
  }

  openNew(i: number) {
    let prev: number = 0;
    // OBTENER LA LECTURA DEL DIA ANTERIOR
    // tslint:disable-next-line: max-line-length
    this.energyService.getEReading(moment.utc(this.erecords[i].fecha).format('YYYY-MM-DD'), this.services[this.selectedService].id).subscribe((res: ERecord[]) => {
      if (res.length > 0) {
        prev = res[0].lectura;
      }
      if (i > 0 && this.erecords[i - 1].plan > 0 && !this.erecords[i - 1].consumo) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        Toast.fire({
          icon: 'error',
          title: 'Debe llenar el registro anterior.',
        } as SweetAlertOptions);
      } else {
        // tslint:disable-next-line: max-line-length
        const newe = Object.assign({}, this.erecords[i]);
        // tslint:disable-next-line: max-line-length
        this.dialogService.open(NewErecordComponent, {context: {newERecord: newe, prev_reading: prev, service: this.services[this.selectedService]}}).onClose.subscribe(
          (newWRecord: ERecord) => {
            if (newWRecord) {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
              });
              Toast.fire({
                icon: 'success',
                title: 'Registro actualizado.',
              } as SweetAlertOptions);
              this.generar_rango_inicial(true);
            }
          },
        );
      }
    });
  }

  openPlans() {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(EnergyPlansComponent, {context: {erecords: this.erecords, service: this.services[this.selectedService], company: this.company, startDate: new Date(this.selectedYear, this.selectedMonth)}}).onClose.subscribe(
      res => {
        this.generar_rango_inicial(false);
      },
    );
  }

  consume_adjust() { // AJUSTA LOS CONSUMOS POR SI CAMBIO ALGUNA LECTURA INTERMEDIA
    let last = 0;
    this.totalConsume = 0;
    this.totalPlan = 0;
    let prev: number = 0;
    const bd_update: ERecord[] = [];
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    // tslint:disable-next-line: max-line-length
    this.energyService.getEReading(moment.utc(this.erecords[0].fecha).format('YYYY-MM-DD'), this.services[this.selectedService].id).subscribe((res: ERecord[]) => {
      if (res.length > 0) {
        prev = res[0].lectura;
      }
      // console.log(this.erecords);
      for (let i = 0; i < this.erecords.length; i++) {
        if (i === 0) {
          this.erecords[i].realacumulado = 0;
          this.erecords[i].planacumulado = 0;
        }
        if (this.erecords[i].id) {
          this.erecords[i].consumo = this.erecords[i].lectura - prev;
        } else {
          this.erecords[i].consumo = 0;
        }
        // console.log(this.erecords[i].consumo);
        // this.totalConsume += this.erecords[i].consumo;
        // console.log(this.totalConsume);
        this.totalPlan += this.erecords[i].plan;
        this.erecords[i].realacumulado = this.erecords[i].consumo + this.erecords[last].realacumulado;
        this.erecords[i].planacumulado = this.erecords[i].plan + this.erecords[last].planacumulado;
        if (this.erecords[i].lectura) {
          last = i;
          prev = this.erecords[last].lectura;
          this.totalConsume = this.erecords[i].realacumulado;
          bd_update.push(this.erecords[i]);
        }
      }
      // console.log(bd_update);
      this.energyService.updateAllERecord(bd_update).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Registro actualizado.',
        } as SweetAlertOptions);
      });
    });
  }

  export() {
    if (!this.show) {
      const table_to_print = []; // tabla final a imprimir
      // tslint:disable-next-line: max-line-length
      const head = [
        '',
        'Día',
        'Plan acumulado',
        'Real acumulado',
        'Plan',
        'Real',
        'Lectura']; // cada fila
      table_to_print.push(head);
      for (let i = 0; i < this.erecords.length; i++) {
        // tslint:disable-next-line: max-line-length
        const dia = moment.utc(this.erecords[i].fecha).locale('es').format('dddd').toUpperCase();
        let bgcolor = '';
        if  (dia === 'SÁBADO' || dia === 'DOMINGO') {
          bgcolor = '#CCCCCC';
        }
        const row = [
          {text: dia, fillColor: bgcolor},
          {text: (i + 1).toString(), fillColor: bgcolor},
          {text: (this.erecords[i].planacumulado > 0) ? this.erecords[i].planacumulado.toString() : '', fillColor: bgcolor},
          {text: (this.erecords[i].realacumulado > 0) ? this.erecords[i].realacumulado.toString() : '', fillColor: bgcolor},
          {text: (this.erecords[i].plan > 0) ? this.erecords[i].plan.toString() : '', fillColor: bgcolor},
          {text: (this.erecords[i].consumo > 0) ? this.erecords[i].consumo.toString() : '', fillColor: bgcolor},
          {text: (this.erecords[i].lectura > 0) ? this.erecords[i].lectura.toString() : '', fillColor: bgcolor}];
        table_to_print.push(row);
      }
      const docDefinition = {
        info: {
          title: 'Consumo de energía de ' + this.currentMonth + ' del ' + this.currentYear,
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
        // pageOrientation: 'landscape',
        content: [
          {
            // tslint:disable-next-line: max-line-length
            text: 'Desglose Plan de Energía ' + ((Number(this.selectedService) > -1) ? this.services[this.selectedService].nombre : this.company.siglas) + ' ' + this.currentYear, fontSize: 15, width: 'auto',
          },
          {
            text: 'Plan para el mes de ' + this.currentMonth + ' ' + this.totalPlan + ' KW', fontSize: 15, width: 'auto',
          },
          {
            table: {
              widths: [70, 50, 90, 90, 50, 50, 70],
              body: table_to_print,
              fontSize: 12,
            },
            layout: {
              paddingLeft: function(i, node) { return 3; },
              paddingRight: function(i, node) { return 3; },
              paddingTop: function(i, node) { return 1; },
              paddingBottom: function(i, node) { return 1; },
              hLineWidth: function (i, node) {
                return (i < 2 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i < 2 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
            },
          },
          {
            table: {
              body: [{text: ' '}],
              heights: [100],
            },
          },
          {
            text: 'Elaborado por: ' + this.user.fullname, fontSize: 12, width: 'auto',
          },
        ],
        pageMargins: [25, 35, 15, 5],
      };
      pdfMake.createPdf(docDefinition).download('Control de energía de ' + this.currentMonth + ' del ' + this.currentYear);
    } else {
      const table_to_print = []; // tabla final a imprimir
      // tslint:disable-next-line: max-line-length
      const head = [
        'Mes',
        'Plan',
        'Real',
        'Plan acumulado',
        'Real acumulado']; // cada fila
      table_to_print.push(head);
      for (let i = 0; i < this.months.length; i++) {
        // tslint:disable-next-line: max-line-length
        const mes = moment().set('month', this.months[i].Mes - 1).locale('es').format('MMMM').toUpperCase();
        const row = [
          {text: mes},
          {text: this.months[i].Plan.toString()},
          {text: this.months[i].Consumo.toString()},
          {text: this.months[i].PlanAcumulado.toString()},
          {text: this.months[i].RealAcumulado.toString()},
          ];
        table_to_print.push(row);
      }
      const docDefinition = {
        info: {
          title: 'Consumo de energía del ' + this.currentYear,
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
        // pageOrientation: 'landscape',
        content: [
          {
            // tslint:disable-next-line: max-line-length
            text: 'Desglose Plan de Energía ' + ((Number(this.selectedService) > -1) ? this.services[this.selectedService].nombre : this.company.siglas) + ' ' + this.currentYear, fontSize: 15, width: 'auto',
          },
          {
            text: 'Plan para el año ' + this.totalYearPlan + ' KW', fontSize: 15, width: 'auto',
          },
          {
            table: {
              widths: [90, 70, 70, 100, 100],
              body: table_to_print,
              fontSize: 12,
            },
            layout: {
              paddingLeft: function(i, node) { return 3; },
              paddingRight: function(i, node) { return 3; },
              paddingTop: function(i, node) { return 1; },
              paddingBottom: function(i, node) { return 1; },
              hLineWidth: function (i, node) {
                return (i < 2 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i < 2 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
            },
          },
          {
            table: {
              body: [{text: ' '}],
              heights: [100],
            },
          },
          {
            text: 'Elaborado por: ' + this.user.fullname, fontSize: 12, width: 'auto',
          },
        ],
        pageMargins: [25, 35, 15, 5],
      };
      pdfMake.createPdf(docDefinition).download('Control de energía del ' + this.currentYear);
    }
  }

}
