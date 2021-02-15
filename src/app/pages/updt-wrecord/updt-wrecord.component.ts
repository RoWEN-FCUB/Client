import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { WRecord } from '../../models/WRecord';
import { WorkshopService } from '../../services/workshop.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { WClient } from '../../models/WClient';
import { WDevice } from '../../models/WDevice';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'updt-wrecord',
  templateUrl: './updt-wrecord.component.html',
  styleUrls: ['./updt-wrecord.component.scss'],
})
export class UpdtWRecordComponent implements OnInit {

  wrecord: WRecord;
  state_status: string;
  clients: WClient[] = [];
  // devices: WDevice[] = [];
  devs: string[] = [];
  marcs: string[] = [];
  models: string[] = [];
  serials: string[] = [];
  inventaries: string[] = [];
  names: string[];
  ot_status: string = 'info';
  receiver_status: string = 'info';
  status_description: string = '';
  client_status: string = 'info';
  client_name_status: string = 'info';
  device_status: string = 'info';
  marc_status: string = 'info';
  model_status: string = 'info';
  inv_status: string = 'info';
  serial_status: string = 'info';
  date_received_status: string = 'info';
  deliver_status: string = 'info';
  fallo_status: string = 'info';
  show_client_name: boolean = false;

  constructor(protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService, private authService: NbAuthService) { }

  ngOnInit() {
    this.updtDeviceStatus();
    this.wrecord.fecha_salida = new Date();
    /*this.workshopService.getWNames().subscribe((res: any[]) => {
      this.names = [];
      for (let i = 0; i < res.length; i++) {
        this.names.push(res[i].nombre);
      }
    });*/
    this.workshopService.getWDevices().subscribe((res: WDevice[]) => {
      // this.devices = res;
      // this.devs = res;
      for (let i = 0; i < res.length; i++) {
        this.devs.push(res[i].equipo);
      }
    });
    this.workshopService.getWMarcs(this.wrecord.equipo).subscribe((res: WDevice[]) => {
      for ( let i = 0; i < res.length; i++) {
        this.marcs.push(res[i].marca);
      }
    });
    this.workshopService.getWClients().subscribe((res: WClient[]) => {
      this.clients = res;
    });
    this.workshopService.getWModels(this.wrecord.equipo, this.wrecord.marca).subscribe((res: WDevice[]) => {
      for ( let i = 0; i < res.length; i++) {
        this.models.push(res[i].modelo);
      }
    });
    this.workshopService.getWSerials(this.wrecord.equipo, this.wrecord.marca, this.wrecord.modelo).subscribe((res: WDevice[]) => {
      for ( let i = 0; i < res.length; i++) {
        this.serials.push(res[i].serie);
        this.inventaries.push(res[i].inventario);
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

  clientChange() {
    const regexp = new RegExp(/^[A-Z]{2,20}$/);
    if (regexp.test(this.wrecord.cliente)) {
      this.client_status = 'success';
    } else {
      this.client_status = 'danger';
    }
    this.show_client_name = true;
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].siglas === this.wrecord.cliente) {
        this.show_client_name = false;
        this.wrecord.cliente_nombre = '';
        break;
      }
    }
  }

  clientNameChange() {
    const nameregexp = new RegExp(/^([A-Za-záéíóúñÑ]+\s?)+$/);
    if (nameregexp.test(this.wrecord.cliente_nombre)) {
      this.client_name_status = 'success';
    } else {
      this.client_name_status = 'danger';
    }
  }

  deviceLostFocus() {
    if (this.wrecord.equipo) {
      this.marcs = [];
      this.workshopService.getWMarcs(this.wrecord.equipo).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.marcs.push(res[i].marca);
        }
      });
    }
  }

  deviceChange() {
    const regexp = new RegExp(/^([A-ZÑ]{1}[a-záéíóúñ]+\s?)+$/);
    if (regexp.test(this.wrecord.equipo)) {
      this.device_status = 'success';
    } else {
      this.device_status = 'danger';
    }
  }

  marcLostFocus() {
    if (this.wrecord.equipo && this.wrecord.marca) {
      this.models = [];
      this.workshopService.getWModels(this.wrecord.equipo, this.wrecord.marca).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.models.push(res[i].modelo);
        }
      });
    }
  }

  marcChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.wrecord.marca)) {
      this.marc_status = 'success';
    } else {
      this.marc_status = 'danger';
    }
  }

  modelLostFocus() {
    if (this.wrecord.equipo && this.wrecord.marca && this.wrecord.modelo) {
      this.serials = [];
      this.inventaries = [];
      this.workshopService.getWSerials(this.wrecord.equipo, this.wrecord.marca, this.wrecord.modelo).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.serials.push(res[i].serie);
          this.inventaries.push(res[i].inventario);
        }
      });
    }
  }

  modelChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.wrecord.modelo)) {
      this.model_status = 'success';
    } else {
      this.model_status = 'danger';
    }
  }

  invChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.wrecord.inventario)) {
      this.inv_status = 'success';
    } else {
      this.inv_status = 'danger';
    }
  }

  failChange() {
    if (this.wrecord.fallo) {
      this.fallo_status = 'success';
    } else if (this.wrecord.estado !== 'P' && !this.wrecord.fallo) {
      this.fallo_status = 'danger';
    }
  }

  serialChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.wrecord.serie)) {
      this.serial_status = 'success';
    } else {
      this.serial_status = 'danger';
    }
  }

  nameChange() {
    const nameregexp = new RegExp(/^([A-Za-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.wrecord.entregado)) {
      this.deliver_status = 'success';
    } else {
      this.deliver_status = 'danger';
    }
  }

  validate() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.client_status === 'danger' || this.wrecord.cliente === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un cliente válido.',
      } as SweetAlertOptions);
      this.client_status = 'danger';
      return false;
    } else if (this.show_client_name && (this.client_name_status === 'danger' || this.wrecord.cliente_nombre === '')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un nombre de cliente válido.',
      } as SweetAlertOptions);
      this.client_name_status = 'danger';
      return false;
    } else if (this.device_status === 'danger' || this.wrecord.equipo === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un equipo válido.',
      } as SweetAlertOptions);
      this.device_status = 'danger';
      return false;
    } else if (this.marc_status === 'danger' || this.wrecord.marca === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una marca válida.',
      } as SweetAlertOptions);
      this.marc_status = 'danger';
      return false;
    } else if (this.model_status === 'danger' || this.wrecord.modelo === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una modelo válido.',
      } as SweetAlertOptions);
      this.model_status = 'danger';
      return false;
    } else if (this.inv_status === 'danger' || this.wrecord.inventario === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de inventario válido.',
      } as SweetAlertOptions);
      this.inv_status = 'danger';
      return false;
    } else if (this.serial_status === 'danger' || this.wrecord.serie === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de serie válido.',
      } as SweetAlertOptions);
      this.serial_status = 'danger';
      return false;
    } else if (this.deliver_status === 'danger' || this.wrecord.entregado === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.deliver_status = 'danger';
      return false;
    } else if (this.ot_status === 'danger' || this.wrecord.ot === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una orden de trabajo válida.',
      } as SweetAlertOptions);
      this.ot_status = 'danger';
      return false;
    } else if (this.fallo_status === 'danger' || (this.wrecord.fallo === '' && this.wrecord.estado !== 'P')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe describir el fallo que presentó el equipo.',
      } as SweetAlertOptions);
      this.fallo_status = 'danger';
      return false;
    } else if (this.receiver_status === 'danger' || this.wrecord.recogido === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre de la persona que recoge el equipo.',
      } as SweetAlertOptions);
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
          timerProgressBar: true,
          timer: 3000,
        });
        Toast.fire({
          icon: 'success',
          title: 'Registro actualizado correctamente.',
        } as SweetAlertOptions);
        this.dialogRef.close(this.wrecord);
      });
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
