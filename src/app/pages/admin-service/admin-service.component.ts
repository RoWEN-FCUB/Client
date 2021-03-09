import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { EserviceService } from '../../services/eservice.service';
import { EService } from '../../models/EService';
import { NewServiceComponent } from '../new-service/new-service.component';
import { Company } from '../../models/Company';
import { CompanyService } from '../../services/company.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.css'],
})
export class AdminServiceComponent implements OnInit {

  services: EService[] = [];
  companies: Company[] = [];
  selected_company = 0;
  constructor(private authService: NbAuthService, private eserviceService: EserviceService,
     private dialogService: NbDialogService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((res: Company[]) => {
      this.companies = res;
      if (this.companies.length > 0) {
        this.getServices();
      }
    });
  }

  getServices() {
    this.eserviceService.getServices(this.companies[this.selected_company].id).subscribe((res: EService[]) => {
      this.services = res;
    });
  }

  openNew() {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewServiceComponent, {context: {title: 'Nuevo servicio', companies: this.companies, empresa_seleccionada: this.companies[this.selected_company].id}}).onClose.subscribe(res => {
      this.getServices();
    });
  }

  openEdit(id: number) {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewServiceComponent, {context: {title: 'Editar servicio', newService: this.services[id], companies: this.companies}}).onClose.subscribe(res => {
      this.getServices();
    });
  }

  deleteService(id: number) {
    Swal.fire({
      title: 'Confirma que desea eliminar el servicio "' + this.services[id].nombre + '"?',
      text: 'Se eliminarán todos sus datos del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.eserviceService.deleteService(this.services[id].id).subscribe(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Servicio eliminado correctamente.',
          } as SweetAlertOptions);
          this.getServices();
        });
      }
    });
  }

}
