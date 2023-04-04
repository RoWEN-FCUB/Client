import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'new-fuel-card',
  templateUrl: './new-fuel-card.component.html',
  styleUrls: ['./new-fuel-card.component.scss']
})
export class NewFuelCardComponent implements OnInit {

  magneticCardForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, protected dialogRef: NbDialogRef<any>) {
    this.magneticCardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],      
    });
  }

  onSubmit() {
    // Lógica para enviar los datos al servidor
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();   // Close the dialog 	  this.dialogRef.close(null);  // or simply.close()
  }

}
