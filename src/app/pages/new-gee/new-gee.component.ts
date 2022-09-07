import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/Company';
import { EService } from '../../models/EService';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbDialogRef } from '@nebular/theme';
import { CompanyService } from '../../services/company.service';
import { EserviceService } from '../../services/eservice.service';
import { GeeService } from '../../services/gee.service';
import { GEE } from '../../models/GEE';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-gee',
  templateUrl: './new-gee.component.html',
  styleUrls: ['./new-gee.component.scss'],
})
export class NewGeeComponent implements OnInit {
  title: string;
  newGEE: GEE = {
    id_emp : -1,
    id_serv: -1,
    kva: 0,
    idgee: '',
    marca: '',
  };
  companies: Company[];
  services: EService[];
  company_status = 'info';
  service_status = 'info';
  idgee_status = 'info';
  marca_status = 'info';
  kva_status = 'info';
  empresa_seleccionada = -1;
  servicio_seleccionado = -1;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private companyService: CompanyService,
    private eservice: EserviceService,
    private geeService: GeeService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((comp: Company[]) => {
      this.companies = comp;
    });
  }

  seleccionarEmpresa() {
    this.company_status = 'success';
    this.service_status = 'info';
    this.services = [];
    this.servicio_seleccionado = -1;
    this.newGEE.id_emp = this.companies[this.empresa_seleccionada].id;
    this.eservice.getServices(this.companies[this.empresa_seleccionada].id).subscribe((serv: EService[]) => {
      this.services = serv;
    });
  }

  seleccionarServicio() {
    this.service_status = 'success';
    this.newGEE.id_serv = this.services[this.servicio_seleccionado].id;
  }

  close() {
    this.dialogRef.close(null);
  }

  validate() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.company_status === 'danger' || this.newGEE.id_emp < 0) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar la empresa a la que pertenece el nuevo grupo.',
      } as SweetAlertOptions);
      this.company_status = 'danger';
    } else if (this.service_status === 'danger' || this.newGEE.id_serv < 0) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar el servicio al que pertenece el nuevo grupo.',
      } as SweetAlertOptions);
      this.service_status = 'danger';
    } else if (this.idgee_status === 'danger' || !this.newGEE.idgee) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir el código identificador del grupo.',
      } as SweetAlertOptions);
      this.idgee_status = 'danger';
    } else if (this.marca_status === 'danger' || !this.newGEE.marca) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir el nombre del fabricante del grupo.',
      } as SweetAlertOptions);
      this.marca_status = 'danger';
    } else if (this.kva_status === 'danger' || !this.newGEE.kva) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir la capacidad de generación del grupo.',
      } as SweetAlertOptions);
      this.kva_status = 'danger';
    } else {
      this.save();
    }
  }

  save() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (!this.newGEE.id) {
      this.geeService.saveGEE(this.newGEE).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Grupo creado correctamente.',
        } as SweetAlertOptions);
        this.close();
      });
    }
  }

  idgee_change() {
    if (this.newGEE.idgee) {
      this.idgee_status = 'success';
    } else {
      this.idgee_status = 'danger';
    }
  }

  marca_change() {
    if (this.newGEE.marca) {
      this.marca_status = 'success';
    } else {
      this.marca_status = 'danger';
    }
  }

  kva_change() {
    const kvaregexp = new RegExp(/^\d+([.]\d+)?$/);
    if (kvaregexp.test(this.newGEE.kva.toString()) && this.newGEE.kva > 0) {
      this.kva_status = 'success';
    } else {
      this.kva_status = 'danger';
    }
  }
}
