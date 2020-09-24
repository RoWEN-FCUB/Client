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
  status_description: string = '';

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

  receiverChange() {
    const nameregexp = new RegExp(/^([A-ZÑ]{1}[a-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.wrecord.recogido)) {
      this.receiver_status = 'success';
    } else {
      this.receiver_status = 'danger';
    }
  }

  updtDeviceStatus() {
    switch (this.wrecord.estado) {
      case 'P':
        this.state_status = 'info';
        this.status_description = 'El equipo aún no se diagnostica.';
        break;
      case 'R':
        this.state_status = 'success';
        this.status_description = 'El equipo está reparado.';
        break;
      case 'D':
        this.state_status = 'danger';
        this.status_description = 'El equipo no se pudo reparar.';
        break;
    }
  }

  validate() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
    if (this.ot_status !== 'success' || this.wrecord.ot === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir una orden de trabajo válida.',
      });
      this.ot_status = 'danger';
      return false;
    } else if (this.receiver_status !== 'success' || this.wrecord.recogido === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir correctamente el nombre de la persona que recoge el equipo.',
      });
      this.receiver_status = 'danger';
      return false;
    }
    return true;
  }

  save() {
    if (this.validate()) {
      this.workshopService.updateRecord(this.wrecord.id, this.wrecord).subscribe(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          type: 'success',
          title: 'Registro actualizado correctamente.',
        });
        this.dialogRef.close(this.wrecord);
      });
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
