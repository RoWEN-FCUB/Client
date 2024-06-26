import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CRecord } from '../../models/CRecord';

@Component({
  selector: 'new-crecord',
  templateUrl: './new-crecord.component.html',
  styleUrls: ['./new-crecord.component.scss']
})
export class NewCrecordComponent {
  newCardRecordForm: UntypedFormGroup;
  newCRecord: CRecord = {};
  saldo: number = 0;

  constructor(private fb: UntypedFormBuilder, protected dialogRef: NbDialogRef<any>) {
    this.newCardRecordForm = this.fb.group({
      fecha: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      saldo: ['', [Validators.pattern(/^(?!0\d)\d*(\.\d+)?(?:[1-9]0|0)?$/), Validators.required, this.saldoIncorrecto()]],
      observ: [''],
    });
  }

  saldoIncorrecto(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const invalido = Number(value) === 0 || (Number(value) > this.saldo && this.newCardRecordForm.get('tipo').value === 'Extraccion');
        return invalido ? {saldoIncorrecto:true}: null;
    }
  }

  onTypeChange() {
    this.newCardRecordForm.controls['saldo'].updateValueAndValidity();
  }

  onSubmit() {
    this.newCRecord.fecha = this.newCardRecordForm.get('fecha')?.value;
    this.newCRecord.observacion = this.newCardRecordForm.get('observ')?.value;
    if (this.newCardRecordForm.get('tipo').value === 'Carga') {
      this.newCRecord.recarga_pesos = Number(this.newCardRecordForm.get('saldo')?.value);
    } else {
      this.newCRecord.consumo_pesos = Number(this.newCardRecordForm.get('saldo')?.value);
    }
    this.dialogRef.close(this.newCRecord);
  }

  close(){
    this.dialogRef.close(null);   // Close the dialog 	  this.dialogRef.close(null);  // or simply.close()
  }

}
