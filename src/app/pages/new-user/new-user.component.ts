import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
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
  urole: string = ''; // rol del usuario en string
  usup: string = ''; // id del superior del usuario en string
  nsup: string = ''; // nombre del superior del usuario
  reppass: string = '';
  nick_status: string = 'info';
  name_status: string = 'info';
  position_status: string = 'info';
  email_status: string = 'info';
  pass_status: string = 'info';
  rpass_status: string = 'info';
  usup_status: string = 'info';
  title: string = '';
  constructor(protected dialogRef: NbDialogRef<any>, private userService: UserService) {

   }

  ngOnInit() {

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
    const nameregexp = new RegExp(/^([A-ZÑ]{1}[a-záéíóúñ]+\s?)+$/);
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
    this.newUser.role = Number(this.urole);
    this.newUser.id_sup = Number(this.usup);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
    if (this.newUser.id) {
      this.userService.updateUser(this.newUser.id, this.newUser).subscribe(res => {
        Toast.fire({
          type: 'success',
          title: 'Usuario editado correctamente.',
        });
        this.close();
      });
    } else {
      this.userService.saveUser(this.newUser).subscribe(res => {
        Toast.fire({
          type: 'success',
          title: 'Usuario creado correctamente.',
        });
        this.close();
      });
    }
  }

  validate_user() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
    if (this.nick_status === 'danger' || this.newUser.user === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir un apodo válido.',
      });
    } else if (this.name_status === 'danger' || this.newUser.fullname === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir un nombre válido.',
      });
    } else if (this.position_status === 'danger' || this.newUser.position === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir un cargo válido.',
      });
    } else if (this.email_status === 'danger' || this.newUser.email === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir una dirección email válida.',
      });
    } else if (this.usup_status === 'danger' || this.usup === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe seleccionar de quien será subordinado el usuario.',
      });
      this.usup_status = 'danger';
    } else  if (this.pass_status === 'danger' || this.newUser.pass === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir una contraseña válida.',
      });
    } else if (this.rpass_status === 'danger' || this.reppass !== this.newUser.pass) {
      Toast.fire({
        type: 'error',
        title: 'Las contraseñas no coinciden.',
      });
    } else {
      if (!this.saving) {
        this.saving = true;
        this.userService.validUser(this.newUser).subscribe( res => {
          if (!res['valid']) {
            Toast.fire({
              type: 'error',
              title: 'El apodo o el email ya está en uso.',
            });
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
