import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { User } from '../../models/User';
import { NbDialogRef } from '@nebular/theme';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { FormControl } from '@angular/forms';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-subs',
  templateUrl: './select-subs.component.html',
  styleUrls: ['./select-subs.component.scss'],
})
export class SelectSubsComponent implements OnInit {
  task: Task;
  subordinados: User[] = [];
  seleccionados = new FormControl();
  sub_status: string = 'info';
  constructor(protected dialogRef: NbDialogRef<any>) { }

  ngOnInit() {
    for (let i = 0; i < this.subordinados.length; i++) {
      if (this.task.id_usuario === this.subordinados[i].id) {
        this.subordinados.splice(i, 1);
        break;
      }
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  subordinados_change() {
    if (this.seleccionados.value.length > 0) {
      this.sub_status = 'success';
    } else {
      this.sub_status = 'danger';
    }
  }

  save() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.sub_status === 'success') {
      const newTask = {task: this.task, subs: this.seleccionados.value};
      this.dialogRef.close(newTask);
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar para que usuario(s) será la tarea.',
      } as SweetAlertOptions);
      this.sub_status = 'danger';
    }
  }

}
