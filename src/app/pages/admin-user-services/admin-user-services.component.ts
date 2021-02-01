import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { EService } from '../../models/EService';
import { NbDialogRef } from '@nebular/theme';
import { EserviceService } from '../../services/eservice.service';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin-user-services',
  templateUrl: './admin-user-services.component.html',
  styleUrls: ['./admin-user-services.component.css']
})
export class AdminUserServicesComponent implements OnInit {

  user: User = {};
  services: EService[] = [];
  selectedServices: EService[] = [];
  markedServ: number[] = [];
  constructor(protected dialogRef: NbDialogRef<any>, private eserviceService: EserviceService) { }

  ngOnInit(): void {
    // console.log(this.selectedServices);
    for (let i = 0; i < this.selectedServices.length; i++) {
      this.markedServ.push(this.selectedServices[i].id);
    }
  }

  save() {
    // console.log(this.markedServ);
    const user_serv = {
      id_usuario: 0,
      id_servicio: 0,
    };
    const datos = [];
    for (let i = 0; i < this.markedServ.length; i++) {
      user_serv.id_usuario = this.user.id;
      user_serv.id_servicio = this.markedServ[i];
      datos.push(Object.values(user_serv));
    }
    this.dialogRef.close(datos);
  }

  close() {
    this.dialogRef.close(null);
  }

}
