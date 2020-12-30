import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { Company } from '../../models/Company';
import { UserService } from '../../services/user.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  saving: boolean = false;
  newUser: User = {
    user: '',
    pass: '',
    fullname: '',
    role: 1,
    email: '',
    picture: 'empty.png',
    id_sup: 0,
    position: '',
  };
  users: User[] = [];
  roles: Role[] = [];
  companies: Company[] = [];
  urole: string = ''; // rol del usuario en string
  usup: string = ''; // id del superior del usuario en string
  nsup: string = ''; // nombre del superior del usuario
  selected_role: number = -1;
  selected_company: number = -1;
  reppass: string = '';
  nick_status: string = 'info';
  name_status: string = 'info';
  position_status: string = 'info';
  email_status: string = 'info';
  pass_status: string = 'info';
  rpass_status: string = 'info';
  usup_status: string = 'info';
  company_status: string = 'info';
  title: string = '';

  constructor(protected dialogRef: NbDialogRef<any>, private userService: UserService) {
  }

  ngOnInit() {
    this.selected_role = this.newUser.role;
    this.selected_company = this.newUser.id_emp;
  }

  nick_change() {
    const nickregexp = new RegExp(/^[a-zA-Z]{4,20}$/);
    if (nickregexp.test(this.newUser.user)) {
      this.nick_status = 'success';
    } else {
      this.nick_status = 'danger';
    }
  }

  name_change() {
    const nameregexp = new RegExp(/^([A-ZÑa-z]{1}[a-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.newUser.fullname)) {
      this.name_status = 'success';
    } else {
      this.name_status = 'danger';
    }
  }

  position_change() {
    if (this.newUser.position === '') {
      this.position_status = 'danger';
    } else {
      this.position_status = 'success';
    }
  }

  email_change() {
    const emailregexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (emailregexp.test(this.newUser.email)) {
      this.email_status = 'success';
    } else {
      this.email_status = 'danger';
    }
  }

  superior_change() {
    if (this.usup === '') {
      this.usup_status = 'danger';
    } else {
      this.usup_status = 'success';
    }
  }

  company_change() {
    if (this.selected_company >= 0) {
      this.company_status = 'success';
    } else {
      this.company_status = 'danger';
    }
  }

  pass_change() {
    const passregexp = new RegExp(/^[a-zA-Z0-9@\.\*]{4,25}$/);
    if (passregexp.test(this.newUser.pass)) {
      this.pass_status = 'success';
    } else {
      this.pass_status = 'danger';
    }
  }

  repeat_pass() {
    if (this.reppass === this.newUser.pass) {
      this.rpass_status = 'success';
    } else {
      this.rpass_status = 'danger';
    }
  }

  save() {
    this.newUser.role = this.selected_role;
    this.newUser.id_emp = this.selected_company;
    this.newUser.id_sup = Number(this.usup);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (typeof this.newUser.id !== 'undefined') {
      this.userService.updateUser(this.newUser.id, this.newUser).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Usuario editado correctamente.',
        } as SweetAlertOptions);
        this.close();
      });
    } else {
      this.userService.saveUser(this.newUser).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Usuario creado correctamente.',
        } as SweetAlertOptions);
        this.close();
      });
    }
  }

  validate_user() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.nick_status === 'danger' || this.newUser.user === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un apodo válido.',
      } as SweetAlertOptions);
      this.nick_status = 'danger';
    } else if (this.name_status === 'danger' || this.newUser.fullname === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un nombre válido.',
      } as SweetAlertOptions);
      this.name_status = 'danger';
    } else if (this.position_status === 'danger' || this.newUser.position === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un cargo válido.',
      } as SweetAlertOptions);
      this.position_status = 'danger';
    } else if (this.email_status === 'danger' || this.newUser.email === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una dirección email válida.',
      } as SweetAlertOptions);
      this.email_status = 'danger';
    } else  if (this.company_status === 'danger' || !this.selected_company) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar una empresa.',
      } as SweetAlertOptions);
      this.company_status = 'danger';
    } else if (this.usup_status === 'danger' || this.usup === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar de quien será subordinado el usuario.',
      } as SweetAlertOptions);
      this.usup_status = 'danger';
    } else  if (this.pass_status === 'danger' || this.newUser.pass === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una contraseña válida.',
      } as SweetAlertOptions);
      this.pass_status === 'danger';
    } else if (this.rpass_status === 'danger' || this.reppass !== this.newUser.pass) {
      Toast.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden.',
      } as SweetAlertOptions);
      this.rpass_status = 'danger';
    } else {
      if (!this.saving) {
        this.saving = true;
        this.userService.validUser(this.newUser).subscribe( res => {
          if (!res['valid']) {
            Toast.fire({
              icon: 'error',
              title: 'El apodo o el email ya está en uso.',
            } as SweetAlertOptions);
            this.saving = false;
          } else {
            this.save();
          }
        });
      }
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
