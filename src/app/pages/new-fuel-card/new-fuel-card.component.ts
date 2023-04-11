import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { FCard } from '../../models/FCard';

@Component({
  selector: 'new-fuel-card',
  templateUrl: './new-fuel-card.component.html',
  styleUrls: ['./new-fuel-card.component.scss']
})
export class NewFuelCardComponent implements OnInit {

  magneticCardForm: UntypedFormGroup;
  newCard: FCard = {
    id_gee: 0,
    numero: '',
    saldo: 0,
    tipo_combustible: ''
  }; 		// new card to be added to the form.
  id_gee: number;		// id of the gee in the database.

  constructor(private fb: UntypedFormBuilder, protected dialogRef: NbDialogRef<any>) {
    this.magneticCardForm = this.fb.group({
      cardNumber: ['', [Validators.pattern(/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/), Validators.required]],
      fuelType: ['', Validators.required],
      cardBalance: ['', [Validators.pattern(/^(?!0\d)\d*(\.\d+)?(?:[1-9]0|0)?$/), Validators.required]],
    });
  }

  onSubmit() {
    // Lógica para enviar los datos al servidor
    this.newCard.numero = this.magneticCardForm.get('cardNumber')?.value.replace(/\s/g, "");
    this.newCard.tipo_combustible = this.magneticCardForm.get('fuelType')?.value;
    this.newCard.saldo = Number(this.magneticCardForm.get('cardBalance')?.value);
    this.newCard.id_gee = this.id_gee; // id de la gee del cliente.
    this.dialogRef.close(this.newCard);
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(null);   // Close the dialog 	  this.dialogRef.close(null);  // or simply.close()
  }

}
