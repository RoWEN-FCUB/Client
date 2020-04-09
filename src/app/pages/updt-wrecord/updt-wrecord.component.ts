import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { WRecord } from '../../models/WRecord';
import { WorkshopService } from '../../services/workshop.service';
import Swal from 'sweetalert2';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'updt-wrecord',
  templateUrl: './updt-wrecord.component.html',
  styleUrls: ['./updt-wrecord.component.scss'],
})
export class UpdtWRecordComponent implements OnInit {

  wrecord: WRecord;
  state_status: string;
  names: string[];
  ot_status: string = 'info';
  receiver_status: string = 'info';

  constructor(protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService, private authService: NbAuthService) { }

  ngOnInit() {
    this.updtDeviceStatus();
    this.wrecord.fecha_salida = new Date();
    this.workshopService.getWNames().subscribe((res: any[]) => {
      this.names = [];
      for (let i = 0; i < res.length; i++) {
        this.names.push(res[i].nombre);
      }
    });
  }

  otChange() {
    const regexp = new RegExp(/^[0-9]{2,10}$/);
    if (regexp.test(this.wrecord.ot)) {
      this.ot_status = 'success';
    } else {
      this.ot_status = 'danger';
    }
  }

  updtDeviceStatus() {
    switch (this.wrecord.estado) {
      case 'P':
        this.state_status = 'info';
        break;
      case 'R':
        this.state_status = 'success';
        break;
      case 'D':
        this.state_status = 'danger';
        break;
    }
  }

  save() {

  }

  close() {
    this.dialogRef.close(null);
  }

}
