import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Company } from '../../models/Company';
@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  company: Company = {};
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_emp: 0};

  constructor(private authService: NbAuthService, private companyService: CompanyService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.companyService.getOne(this.user.id_emp).subscribe((res: Company) => {
        this.company = res;
      });
    });
  }
}
