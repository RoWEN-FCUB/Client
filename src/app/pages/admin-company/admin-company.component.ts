import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
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

  getCompanies() {
    this.companyService.getCompanies().subscribe((res: Company[]) => {
      this.companies = res;
    });
  }

}
