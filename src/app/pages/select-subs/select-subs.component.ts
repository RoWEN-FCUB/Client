import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { User } from '../../models/User';
import { NbDialogRef } from '@nebular/theme';
import Swal from 'sweetalert2';
@Component({
  selector: 'select-subs',
  templateUrl: './select-subs.component.html',
  styleUrls: ['./select-subs.component.scss'],
})
export class SelectSubsComponent implements OnInit {
  task: Task;
  subordinados: User[] = [];
  seleccionados: Number[] = [];
  sub_status: string = 'info';
  constructor(protected dialogRef: NbDialogRef<any>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(null);
  }

  subordinados_change() {
    if (this.seleccionados.length > 0) {
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
      timer: 3000,
    });
    if (this.sub_status === 'success') {
      const newTask = {task: this.task, subs: this.seleccionados};
      this.dialogRef.close(newTask);
    } else {
      Toast.fire({
        type: 'error',
        title: 'Debe seleccionar para que usuario(s) será la tarea.',
      });
      this.sub_status = 'danger';
    }
  }

}
