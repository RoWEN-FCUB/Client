import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { WRecord } from '../../models/WRecord';
import { WClient } from '../../models/WClient';
import { WDevice } from '../../models/WDevice';
import { WorkshopService } from '../../services/workshop.service';
import Swal from 'sweetalert2';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-wrecord',
  templateUrl: './new-wrecord.component.html',
  styleUrls: ['./new-wrecord.component.scss'],
})
export class NewWRecordComponent implements OnInit {

  clients: WClient[];
  devices: WDevice[];
  devs: string[];
  marcs: string[];
  models: string[];
  newrecord: WRecord = {
    cliente: '',
    equipo: '',
    marca: '',
    modelo: '',
  };
  client_status: string = 'info';
  device_status: string = 'info';
  marc_status: string = 'info';
  model_status: string = 'info';
  constructor(protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService) { }

  ngOnInit() {
    this.workshopService.getWClients().subscribe((res: WClient[]) => {
      this.clients = res;
      // console.log(this.clients);
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
  }

  clientChange() {
    const regexp = new RegExp(/^[A-Z]{4,20}$/);
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
    const devregexp = new RegExp(/^[a-zA-Z]{4,20}$/);
    if (devregexp.test(this.newrecord.equipo)) {
      this.device_status = 'success';
    } else {
      this.device_status = 'danger';
    }
  }

  marcChange() {

  }

  modelChange() {

  }

  close() {
    this.dialogRef.close(null);
  }

}
