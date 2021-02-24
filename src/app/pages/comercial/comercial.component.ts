import { Component, OnInit } from '@angular/core';
import { CProvider } from '../../models/CProvider';
import { ComercialService } from '../../services/comercial.service';
import { NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import 'moment/min/locales';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import Swal, { SweetAlertOptions } from 'sweetalert2';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { OwlDateTimeComponent /*, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE*/ } from '@danielmoncada/angular-datetime-picker';
import { Moment } from 'moment';
import {HttpClient} from '@angular/common/http';
import * as fsaver from 'file-saver';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css'],
})
export class ComercialComponent implements OnInit {

  proveedores: CProvider[] = [];
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_emp: 0};

  constructor(private comercialService: ComercialService, private http: HttpClient, private dialogService: NbDialogService,
    private authService: NbAuthService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.comercialService.getProviders(this.user.id_emp).subscribe((prov: CProvider[]) => {
        this.proveedores = prov;
      });
    });
  }

  tabChanged(e) {
    // console.log(e);
  }

}
