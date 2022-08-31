import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthService } from '@nebular/auth';
import { GEE } from '../../models/GEE';
import { GeeService } from '../../services/gee.service';
import { NewGeeComponent } from '../new-gee/new-gee.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin-gee',
  templateUrl: './admin-gee.component.html',
  styleUrls: ['./admin-gee.component.scss']
})
export class AdminGeeComponent implements OnInit {
  gees: GEE[];

  constructor(private authService: NbAuthService, private geeService: GeeService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getGEEs();
  }

  getGEEs() {
    this.geeService.listGEEs().subscribe((gees: GEE[]) => {
      this.gees = gees;
    });
  }

  openNew() {
    this.dialogService.open(NewGeeComponent, {context: {title: 'Nuevo GEE'}}).onClose.subscribe(res => {
      this.getGEEs();
    });
  }

}
