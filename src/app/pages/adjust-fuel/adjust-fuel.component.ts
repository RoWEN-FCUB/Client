import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeeTank } from '../../models/GeeTank';

@Component({
  selector: 'adjust-fuel',
  templateUrl: './adjust-fuel.component.html',
  styleUrls: ['./adjust-fuel.component.scss']
})
export class AdjustFuelComponent {
  newCardRecordForm: UntypedFormGroup;
  tank: GeeTank = {};

  constructor(private fb: UntypedFormBuilder, protected dialogRef: NbDialogRef<any>) {
    this.newCardRecordForm = this.fb.group({
      existencia: ['', [Validators.pattern(/^(?!0\d)\d*(\.\d+)?(?:[1-9]0|0)?$/), Validators.required]],
      observ: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.newCardRecordForm.controls.existencia.setValue(this.tank.existencia);
    this.tank.entrada = null;
    this.tank.salida = null;
    this.tank.id_operacion = null;
  }

  onSubmit() {
    this.tank.fecha = new Date();
    this.tank.existencia = Number(this.newCardRecordForm.controls.existencia.value);
    this.tank.observacion = this.newCardRecordForm.controls.observ.value;
    this.dialogRef.close(this.tank);
  }

  close(){
    this.dialogRef.close(null);   // Close the dialog 	  this.dialogRef.close(null);  // or simply.close()
  }

}
