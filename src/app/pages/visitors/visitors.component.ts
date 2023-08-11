import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { Company } from '../../models/Company';
import { EService } from '../../models/EService';
import { Visitor } from '../../models/Visitor';
import { CompanyService } from '../../services/company.service';
import { EserviceService } from '../../services/eservice.service';
import { VisitorsService } from '../../services/visitors.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faIdCard, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ScanQRComponent } from '../scan-qr/scan-qr.component';
import * as moment from 'moment';


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
  newVisitorRecordForm: UntypedFormGroup;
  newVisitor: Visitor = {};

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
      this.getVisitors();
    });
  }

  getVisitors() {
    this.visitorsService.getVRecords(this.config.currentPage, this.user.id_serv).subscribe((res: {vrecords: Visitor[], total: number}) => {
      //console.log(res);
      this.config.totalItems = res.total;
      this.vrecords = res.vrecords;
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
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
  }

}