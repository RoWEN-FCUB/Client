import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { WRecord } from '../../models/WRecord';
import { WClient } from '../../models/WClient';
import { WDevice } from '../../models/WDevice';
import { WorkshopService } from '../../services/workshop.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-wrecord',
  templateUrl: './new-wrecord.component.html',
  styleUrls: ['./new-wrecord.component.scss'],
})
export class NewWRecordComponent implements OnInit {

  clients: WClient[] = [];
  devices: WDevice[] = [];
  devs: string[] = [];
  marcs: string[] = [];
  models: string[] = [];
  serials: string[] = [];
  inventaries: string[] = [];
  names: string[] = [];
  newrecord: WRecord = {
    cliente: '',
    equipo: '',
    marca: '',
    modelo: '',
    inventario: '',
    serie: '',
    fecha_entrada: new Date(),
    entregado: '',
    especialista: '',
    cliente_nombre: '',
    estado: 'P',
    id_superior: 0,
    id_emp: 0,
    fallo: '',
    observaciones: '',
  };
  client_status: string = 'info';
  client_name_status: string = 'info';
  device_status: string = 'info';
  marc_status: string = 'info';
  model_status: string = 'info';
  inv_status: string = 'info';
  serial_status: string = 'info';
  date_received_status: string = 'info';
  deliver_status: string = 'info';
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_sup: 0, id_emp: 0};
  show_client_name: boolean = false;
  constructor(protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService, private authService: NbAuthService) { }

  ngOnInit() {
    this.workshopService.getWClients().subscribe((res: WClient[]) => {
      this.clients = res;
    });
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.newrecord.id_emp = this.user.id_emp;
      this.newrecord.especialista = this.user.fullname;
      this.newrecord.id_superior = this.user.id_sup;
    });
    this.workshopService.getWDevices().subscribe((res: WDevice[]) => {
      this.devices = res;
      this.devs = [];
      for (let i = 0; i < this.devices.length; i++) {
        if (!this.devs.includes(this.devices[i].equipo)) {
          this.devs.push(this.devices[i].equipo);
        }
      }
    });
    this.workshopService.getWNames().subscribe((res: any[]) => {
      this.names = [];
      for (let i = 0; i < res.length; i++) {
        this.names.push(res[i].nombre);
      }
    });
  }

  clientChange() {
    const regexp = new RegExp(/^[A-Z]{2,20}$/);
    if (regexp.test(this.newrecord.cliente)) {
      this.client_status = 'success';
    } else {
      this.client_status = 'danger';
    }
    this.show_client_name = true;
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].siglas === this.newrecord.cliente) {
        this.show_client_name = false;
        this.newrecord.cliente_nombre = '';
        break;
      }
    }
  }

  clientNameChange() {
    const nameregexp = new RegExp(/^([A-Za-záéíóúñÑ]+\s?)+$/);
    if (nameregexp.test(this.newrecord.cliente_nombre)) {
      this.client_name_status = 'success';
    } else {
      this.client_name_status = 'danger';
    }
  }

  deviceChange() {
    this.marcs = [];
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].equipo === this.newrecord.equipo) {
        if (!this.marcs.includes(this.devices[i].marca)) {
          this.marcs.push(this.devices[i].marca);
        }
      }
    }
    const regexp = new RegExp(/^([A-ZÑ]{1}[a-záéíóúñ]+\s?)+$/);
    if (regexp.test(this.newrecord.equipo)) {
      this.device_status = 'success';
    } else {
      this.device_status = 'danger';
    }
  }

  marcChange() {
    this.models = [];
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].marca === this.newrecord.marca && this.devices[i].equipo === this.newrecord.equipo) {
        if (!this.models.includes(this.devices[i].modelo)) {
          this.models.push(this.devices[i].modelo);
        }
      }
    }
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.marca)) {
      this.marc_status = 'success';
    } else {
      this.marc_status = 'danger';
    }
  }

  modelChange() {
    this.serials = [];
    this.inventaries = [];
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].modelo === this.newrecord.modelo) {
        if (!this.serials.includes(this.devices[i].serie)) {
          this.serials.push(this.devices[i].serie);
        }
        if (!this.inventaries.includes(this.devices[i].inventario)) {
          this.inventaries.push(this.devices[i].inventario);
        }
      }
    }
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.modelo)) {
      this.model_status = 'success';
    } else {
      this.model_status = 'danger';
    }
  }

  invChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.inventario)) {
      this.inv_status = 'success';
    } else {
      this.inv_status = 'danger';
    }
  }

  serialChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.serie)) {
      this.serial_status = 'success';
    } else {
      this.serial_status = 'danger';
    }
  }

  nameChange() {
    const nameregexp = new RegExp(/^([A-Za-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.newrecord.entregado)) {
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
    if (this.client_status === 'danger' || this.newrecord.cliente === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un cliente válido.',
      } as SweetAlertOptions);
      this.client_status = 'danger';
      return false;
    } else if (this.show_client_name && (this.client_name_status === 'danger' || this.newrecord.cliente_nombre === '')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un nombre de cliente válido.',
      } as SweetAlertOptions);
      this.client_name_status = 'danger';
      return false;
    } else if (this.device_status === 'danger' || this.newrecord.equipo === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un equipo válido.',
      } as SweetAlertOptions);
      this.device_status = 'danger';
      return false;
    } else if (this.marc_status === 'danger' || this.newrecord.marca === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una marca válida.',
      } as SweetAlertOptions);
      this.marc_status = 'danger';
      return false;
    } else if (this.model_status === 'danger' || this.newrecord.modelo === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una modelo válido.',
      } as SweetAlertOptions);
      this.model_status = 'danger';
      return false;
    } else if (this.inv_status === 'danger' || this.newrecord.inventario === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de inventario válido.',
      } as SweetAlertOptions);
      this.inv_status = 'danger';
      return false;
    } else if (this.serial_status === 'danger' || this.newrecord.serie === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de serie válido.',
      } as SweetAlertOptions);
      this.serial_status = 'danger';
      return false;
    } else if (this.deliver_status === 'danger' || this.newrecord.entregado === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.deliver_status = 'danger';
      return false;
    }
    return true;
  }

  save() {
    if (this.validate()) {
      // console.log(this.newrecord);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      this.workshopService.saveRecord(this.newrecord).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Registro guardado correctamente.',
        } as SweetAlertOptions);
        this.dialogRef.close(this.newrecord);
      });
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
