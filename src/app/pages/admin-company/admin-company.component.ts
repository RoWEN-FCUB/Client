import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthService } from '@nebular/auth';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/Company';
import { NewCompanyComponent } from '../../pages/new-company/new-company.component';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css'],
})
export class AdminCompanyComponent implements OnInit {

  companies: Company[];

  constructor(private authService: NbAuthService, private companyService: CompanyService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  openNew() {
    this.dialogService.open(NewCompanyComponent, {context: {companies: this.companies, title: 'Nueva empresa'}}).onClose.subscribe(res => {
      this.getCompanies();
    });
  }

  openEdit(id: number) {
    const contxt = {
      title: 'Editar datos de ' + this.companies[id].siglas,
      newCompany: this.companies[id],
    };
    this.dialogService.open(NewCompanyComponent, {context: contxt}).onClose.subscribe(res => {
      this.getCompanies();
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe((res: Company[]) => {
      this.companies = res;
    });
  }

  deleteCompany(id: number) {
    Swal.fire({
      title: 'Confirma que desea eliminar la empresa "' + this.companies[id].nombre + '"?',
      text: 'Se eliminarán todos sus datos del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.companyService.deleteCompany(this.companies[id].id).subscribe(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Empresa eliminada correctamente.',
          } as SweetAlertOptions);
          this.getCompanies();
        });
      }
    });
  }

}
