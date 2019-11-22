import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'new-obs',
  templateUrl: './new-obs.component.html',
  styleUrls: ['./new-obs.component.scss'],
})
export class NewObsComponent implements OnInit {
  id_tarea;
  observ: String;
  constructor(protected dialogRef: NbDialogRef<any>) { }

  ngOnInit() {
  }

  close() {
    // console.log(this.task);
    this.dialogRef.close(null);
  }

  save() {
    this.dialogRef.close({id_tarea: this.id_tarea, observacion: this.observ});
  }

}
