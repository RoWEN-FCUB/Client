import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UserService } from '../../services/user.service';
// import { User } from '../../@core/data/users';
import { User } from '../../models/User';
import { NbDialogService } from '@nebular/theme';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import ipserver from '../../ipserver';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  saving: boolean = false;
  nick_status: string = 'info';
  name_status: string = 'info';
  email_status: string = 'info';
  pass_status: string = 'info';
  user = {name: '', picture: '', id: 0, role: '', fullname: ''};
  bd_user: User = {
    id: 0,
    user: '',
    fullname: '',
    pass: '',
    role: 0,
    email: '',
    picture: 'empty.png',
  };
  userpicture = ipserver + 'public/' + this.bd_user.picture;
  constructor(private router: Router, private authService: NbAuthService, private userService: UserService, private dialogService: NbDialogService) {
  }

  nick_change() {
    const nickregexp = new RegExp(/^[a-zA-Z]{4,20}$/);
    if (nickregexp.test(this.bd_user.user)) {
      this.nick_status = 'success';
    } else {
      this.nick_status = 'danger';
    }
  }

  name_change() {
    const nameregexp = new RegExp(/^([A-ZÑ]{1}[a-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.bd_user.fullname)) {
      this.name_status = 'success';
    } else {
      this.name_status = 'danger';
    }
  }

  email_change() {
    const emailregexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (emailregexp.test(this.bd_user.email)) {
      this.email_status = 'success';
    } else {
      this.email_status = 'danger';
    }
  }

  pass_change() {
    const passregexp = new RegExp(/^[a-zA-Z0-9@\.\*]{4,25}$/);
    if (passregexp.test(this.bd_user.pass)) {
      this.pass_status = 'success';
    } else {
      this.pass_status = 'danger';
    }
  }

  open() {
    this.dialogService.open(UploadImgComponent, {
      context: {
        imgURL: this.userpicture,
      },
    }).onClose.subscribe(navatar => {
      this.bd_user.picture = navatar;
      this.userpicture = ipserver + 'public/' + navatar;
    });
  }

  save() {
    this.userService.updateUser(this.bd_user.id, this.bd_user).subscribe(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        type: 'success',
        title: 'Datos guardados correctamente.',
      });
      this.router.navigate(['/auth/logout']);
    });
  }

  validate_user() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
    if (this.nick_status === 'danger'  || this.bd_user.user === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir un apodo válido.',
      });
    } else if (this.name_status === 'danger' || this.bd_user.fullname === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir un nombre válido.',
      });
    } else if (this.email_status === 'danger' || this.bd_user.email === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir una dirección email válido.',
      });
    } else if (this.pass_status === 'danger' || this.bd_user.pass === '') {
      Toast.fire({
        type: 'error',
        title: 'Debe escribir una contraseña válida.',
      });
    } else {
      if (!this.saving) {
        this.saving = true;
        this.userService.validUser(this.bd_user).subscribe( res => {
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

  ngOnInit() {
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.userService.getUser(this.user.id).subscribe(
        resp => {
          this.bd_user = resp as User;
          // console.log(this.bd_user.role);
          this.userpicture = ipserver + 'public/' + this.bd_user.picture;
        },
      );
    });
  }

}
