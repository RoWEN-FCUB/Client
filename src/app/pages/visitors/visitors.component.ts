import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { Company } from '../../models/Company';
import { EService } from '../../models/EService';
import { Visitor } from '../../models/Visitor';
import { Department } from '../../models/Department';
import { CompanyService } from '../../services/company.service';
import { EserviceService } from '../../services/eservice.service';
import { VisitorsService } from '../../services/visitors.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faIdCard, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ScanQRComponent } from '../scan-qr/scan-qr.component';
import * as moment from 'moment';
import { map, Observable, of } from 'rxjs';


@Component({
  selector: 'visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent {
  config: any;
  company: Company = {};
  service: EService = {};
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_emp: 0, id_serv: 0, ci: ''};
  vrecords: Visitor[] = [];
  vnames: Visitor[] = [];
  departments: Department[] = [];
  newVisitorRecordForm: UntypedFormGroup;
  newVisitor: Visitor = {};
  @ViewChild('hora_salida', {static: false}) hora_salida: ElementRef;
  @ViewChild('nombre', {static: false}) nombre: ElementRef;
  filteredVisitors$: Observable<Visitor[]>;

  constructor(private eserviceService: EserviceService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private companyService: CompanyService,
    private visitorsService: VisitorsService,
    private fb: UntypedFormBuilder,
    private library: FaIconLibrary,) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
      };
      this.newVisitorRecordForm = this.fb.group({
        nombre: ['', [Validators.required]],
        organismo: ['', [Validators.required]],
        ci: ['', [Validators.pattern(/^[0-9]{11}$/), Validators.required]],
        departamento: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        hora_entrada: ['', [Validators.required]],
        hora_salida: ['', []],
      });
      this.library.addIcons(faIdCard, faTrashAlt);
  }

  ngOnInit() {
    const usr = this.authService.getToken().subscribe((res: NbAuthJWTToken) => {
      this.user = res.getPayload();
      this.companyService.getOne(this.user.id_emp).subscribe((comp: Company) => {
        this.company = comp;
      });
      this.eserviceService.getOne(this.user.id_serv).subscribe((serv: EService) => {
        this.service = serv;
      });
      this.eserviceService.getDeparments(this.user.id_serv).subscribe((departments: Department[]) => {
        this.departments = departments;
      });
      this.getVisitors();
    });
  }

  clickShowExitHour(selectedVisitor: Visitor) {
    if (!selectedVisitor.hora_salida) {
      const picked_date: HTMLElement = this.hora_salida.nativeElement;
      this.newVisitor = selectedVisitor;
      picked_date.click();
    }
  }

  getVisitors() {
    this.visitorsService.getVRecords(this.config.currentPage, this.user.id_serv).subscribe((res: {vrecords: Visitor[], total: number}) => {
      //console.log(res);
      this.config.totalItems = res.total;
      this.vrecords = res.vrecords;
    });
    this.visitorsService.getVNames(this.user.id_serv).subscribe((res: Visitor[]) => {
      this.vnames = res;
      this.filteredVisitors$ = of(this.vnames);
    });
  }

  onNameSelectionChange($event) {
    if ($event) {
      this.nameChange();
      //setTimeout(() => this.nombre.nativeElement.focus(), 0);
    }
  }

  onCISelectionChange($event) {
    if ($event) {
      this.nameChange();
      //setTimeout(() => this.nombre.nativeElement.focus(), 0);
    }
  }

  nameChange() {
    this.filteredVisitors$ = this.getFilteredNamesOptions(this.newVisitorRecordForm.controls.nombre.value);
  }

  ciChange() {
    this.filteredVisitors$ = this.getFilteredCIsOptions(this.newVisitorRecordForm.controls.ci.value);
  }

  filterNames(value: string): Visitor[] {
    const filterValue = value.toLowerCase();
    return this.vnames.filter(optionValue => optionValue.nombre.toLowerCase().includes(filterValue));
  }

  filterCIs(value: string): Visitor[] {
    const filterValue = value.toLowerCase();
    return this.vnames.filter(optionValue => optionValue.ci.toLowerCase().includes(filterValue));
  }

  getFilteredNamesOptions(value: string): Observable<Visitor[]> {
    return of(value).pipe(
      map(filterString => this.filterNames(filterString)),
    );
  }

  getFilteredCIsOptions(value: string): Observable<Visitor[]> {
    return of(value).pipe(
      map(filterString => this.filterCIs(filterString)),
    );
  }

  complete(visitor: Visitor) {
    this.newVisitorRecordForm.reset();
    this.newVisitorRecordForm.controls.nombre.setValue(visitor.nombre);
    this.newVisitorRecordForm.controls.organismo.setValue(visitor.organismo);
    this.newVisitorRecordForm.controls.ci.setValue(visitor.ci);
    this.newVisitorRecordForm.controls.departamento.setValue(visitor.departamento);
    this.newVisitorRecordForm.controls.fecha.setValue(new Date());
    this.newVisitorRecordForm.controls.hora_entrada.setValue(new Date());
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.getVisitors();
  }

  openQR() {
    this.dialogService.open(ScanQRComponent).onClose.subscribe(result => {
      if (result) {
       const fullname = this.toTitleCase(result.N + ' ' + result.A);
       this.newVisitorRecordForm.controls.nombre.setValue(fullname);
       this.newVisitorRecordForm.controls.ci.setValue(result.CI);
       this.newVisitorRecordForm.controls.fecha.setValue(new Date());
       this.newVisitorRecordForm.controls.hora_entrada.setValue(new Date());
       this.visitorsService.getVRecord(result.CI).subscribe((res: Visitor) => {
        if (res) {
          this.newVisitorRecordForm.controls.organismo.setValue(res.organismo);
          this.newVisitorRecordForm.controls.departamento.setValue(res.departamento);
        }
       });
      }
    });
  }

  toTitleCase(str: string) {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    return titleCase;
  }

  onDateChange() {
    this.newVisitor.hora_salida = this.newVisitorRecordForm.controls.hora_salida.value;
    if (this.newVisitor.hora_salida instanceof Date && this.newVisitor.id) {      
      this.newVisitor.hora_salida = {hours: moment(this.newVisitor.hora_salida).hours(), minutes: moment(this.newVisitor.hora_salida).minutes()};
      this.visitorsService.updateVisitor(this.newVisitor).subscribe(result => {
        this.getVisitors();
        this.clearForm();
      });
    }
  }


  filterVisitors() {
    const formValue = this.newVisitorRecordForm.value;const mapped = Object.values(formValue).map(value => !!value);
    const hasValues = mapped.some(value => value);
    if (!hasValues) {
      this.getVisitors();
    } else {
      this.newVisitor.nombre = this.newVisitorRecordForm.controls.nombre.value;
      this.newVisitor.ci = this.newVisitorRecordForm.controls.ci.value;
      this.newVisitor.fecha = this.newVisitorRecordForm.controls.fecha.value;
      this.newVisitor.hora_entrada = this.newVisitorRecordForm.controls.hora_entrada.value;
      this.newVisitor.hora_salida = this.newVisitorRecordForm.controls.hora_salida.value;
      this.newVisitor.departamento = this.newVisitorRecordForm.controls.departamento.value;
      this.newVisitor.autoriza = this.user.id;
      this.newVisitor.id_servicio = this.user.id_serv;
      this.newVisitor.organismo = this.newVisitorRecordForm.controls.organismo.value;
      if (this.newVisitor.hora_entrada instanceof Date) {
        this.newVisitor.hora_entrada = {hours: moment(this.newVisitor.hora_entrada).hours(), minutes: moment(this.newVisitor.hora_entrada).minutes()};
      }
      if (this.newVisitor.hora_salida instanceof Date) {
        this.newVisitor.hora_salida = {hours: moment(this.newVisitor.hora_salida).hours(), minutes: moment(this.newVisitor.hora_salida).minutes()};
      } else {
        this.newVisitor.hora_salida = null;
      }
      this.visitorsService.filterVisitors(this.config.currentPage, this.user.id_serv, this.newVisitor).subscribe((res: {vrecords: Visitor[], total: number}) => {
        //console.log(res);
        this.config.totalItems = res.total;
        this.vrecords = res.vrecords;
      });
    }
  }

  saveVisitor() {
    this.newVisitor.nombre = this.newVisitorRecordForm.controls.nombre.value;
    this.newVisitor.ci = this.newVisitorRecordForm.controls.ci.value;
    this.newVisitor.fecha = this.newVisitorRecordForm.controls.fecha.value;
    this.newVisitor.hora_entrada = this.newVisitorRecordForm.controls.hora_entrada.value;
    this.newVisitor.hora_salida = this.newVisitorRecordForm.controls.hora_salida.value;
    this.newVisitor.departamento = this.newVisitorRecordForm.controls.departamento.value;
    this.newVisitor.autoriza = this.user.id;
    this.newVisitor.id_servicio = this.user.id_serv;
    this.newVisitor.organismo = this.newVisitorRecordForm.controls.organismo.value;
    if (this.newVisitor.hora_entrada instanceof Date) {
      this.newVisitor.hora_entrada = {hours: moment(this.newVisitor.hora_entrada).hours(), minutes: moment(this.newVisitor.hora_entrada).minutes()};
    }
    if (this.newVisitor.hora_salida instanceof Date) {
      this.newVisitor.hora_salida = {hours: moment(this.newVisitor.hora_salida).hours(), minutes: moment(this.newVisitor.hora_salida).minutes()};
    } else {
      this.newVisitor.hora_salida = null;
    }
    if (this.newVisitorRecordForm.valid) {
      //console.log(this.newVisitor);
      this.visitorsService.saveVisitor(this.newVisitor).subscribe(
        (data) => {
          this.newVisitorRecordForm.reset();
          this.getVisitors();
        },
        (error) => {
          console.log(error);
        });
    }
  }

  deleteVisitor(id: number) {
    this.visitorsService.delete(id).subscribe(res => {
      this.getVisitors();
    });
  }

  clearForm() {
    this.newVisitorRecordForm.reset();
    this.newVisitor = {};
    this.getVisitors();
  }

}