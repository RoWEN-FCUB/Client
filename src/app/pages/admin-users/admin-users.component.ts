import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { Company } from '../../models/Company';
import { NewUserComponent } from '../new-user/new-user.component';
import { NbDialogService } from '@nebular/theme';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  companies: Company[] = [];
  constructor(private authService: NbAuthService,
    private userService: UserService,
    private dialogService: NbDialogService,
    private companyService: CompanyService) { }

  openNew() {
    // tslint:disable-next-line: max-line-length
    const context = {
      users: this.users,
      roles: this.roles,
      title: 'Nuevo usuario',
      companies: this.companies,
    };
    this.dialogService.open(NewUserComponent, {context: context}).onClose.subscribe(res => {
      this.getUsers();
    });
  }

  openEdit(id: number) {
    const contxt = {
      users: this.users,
      newUser: this.users[id],
      urole: '' + this.users[id].role,
      usup: '' + this.users[id].id_sup,
      reppass: this.users[id].pass,
      title: 'Editar datos de ' + this.users[id].user,
      nsup: this.superior(this.users[id].id_sup),
      roles: this.roles,
      companies: this.companies,
    };
    this.dialogService.open(NewUserComponent, {context: contxt}).onClose.subscribe(res => {
      this.getUsers();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
      this.getRoles();
    });
  }

  getRoles() {
    this.userService.getRoles().subscribe((res: Role[]) => {
      this.roles = res;
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe((res: Company[]) => {
      this.companies = res;
    });
  }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
    this.getCompanies();
  }

  superior(id: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i].user;
      }
    }
    return 'Unknown';
  }

  getRole(id: number) {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].id === id) {
        return this.roles[i].role;
      }
    }
    return 'Unknown';
  }

  deleteUser(id: number, name: string) {
    let user;
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      user = token.getPayload();
      if (user.id === id) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        Toast.fire({
          icon: 'error',
          title: 'No se puede eliminar el usario con el que se ha autenticado.',
        } as SweetAlertOptions);
      } else {
        Swal.fire({
          title: 'Confirma que desea eliminar al usuario "' + name + '"?',
          text: 'Se eliminarán todos sus datos del sistema.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí­',
          cancelButtonText: 'No',
        } as SweetAlertOptions).then((result) => {
          if (result.value) {
            this.userService.deleteUser(id).subscribe(res => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
              });
              Toast.fire({
                icon: 'success',
                title: 'Usuario eliminado correctamente.',
              } as SweetAlertOptions);
              this.getUsers();
            });
          }
        });
      }
    });

  }

}
