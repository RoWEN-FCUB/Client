import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CProvider } from '../../models/CProvider';
import { ComercialService } from '../../services/comercial.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-cprovider',
  templateUrl: './new-cprovider.component.html',
  styleUrls: ['./new-cprovider.component.css'],
})
export class NewCproviderComponent implements OnInit {
  id_empresa: number;
  newProvider: CProvider = {
    id_empresa: 0,
    nombre: '',
    reeup: '',
    siglas: '',
  };
  name_status: string = 'info';
  reeup_status = 'info';
  siglas_status = 'info';

  constructor(private comercialService: ComercialService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
    this.newProvider.id_empresa = this.id_empresa;
  }

  name_change() {
    if (!this.newProvider.nombre) {
      this.name_status = 'danger';
    } else {
      this.name_status = 'success';
    }
  }

  siglas_change() {
    const nickregexp = new RegExp(/^[A-Z0-9ÁÉÍÓÚÑ\s]{2,50}$/);
    if (nickregexp.test(this.newProvider.siglas)) {
      this.siglas_status = 'success';
    } else {
      this.siglas_status = 'danger';
    }
  }

  reeup_change() {
    const nickregexp = new RegExp(/^[0-9]{3}\.[0-9]{1}\.[0-9]{5}$/);
    if (nickregexp.test(this.newProvider.reeup)) {
      this.reeup_status = 'success';
    } else {
      this.reeup_status = 'danger';
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (!this.newProvider.siglas || this.siglas_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe introducir siglas válidas.',
      } as SweetAlertOptions);
      this.siglas_status = 'danger';
    } else if (!this.newProvider.reeup || this.reeup_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe introducir un código reeup válido.',
      } as SweetAlertOptions);
      this.reeup_status = 'danger';
    } else if (!this.newProvider.nombre || this.name_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe introducir un nombre válido.',
      } as SweetAlertOptions);
      this.name_status = 'danger';
    } else {
      if (!this.newProvider.id) {
        this.comercialService.createProvider(this.newProvider).subscribe(res => {
          this.dialogRef.close(this.newProvider);
        });
      } else {
        this.comercialService.updateProvider(this.newProvider, this.newProvider.id).subscribe( res => {
          this.dialogRef.close(this.newProvider);
        });
      }
    }
  }

}
