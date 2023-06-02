import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { FType } from '../../models/FType';

@Component({
  selector: 'fuel-price',
  templateUrl: './fuel-price.component.html',
  styleUrls: ['./fuel-price.component.scss']
})
export class FuelPriceComponent {
  newPriceForm: UntypedFormGroup;
  fuels: FType[] = [];
  precio_anterior: number = 0;

  constructor(private fb: UntypedFormBuilder, protected dialogRef: NbDialogRef<any>) {
    this.newPriceForm = this.fb.group({
      fuelType: [this.fuels[0], Validators.required],
      nuevo_precio: ['', [Validators.pattern(/^(?!0\d)\d*(\.\d+)?(?:[1-9]0|0)?$/), Validators.required]],
    });
  }

  onSubmit() {
    // Lógica para enviar los datos al servidor
    const new_fuel: FType = {
      id: this.newPriceForm.controls.fuelType.value.id,
      tipo_combustible: this.newPriceForm.controls.fuelType.value.tipo_combustible,
      precio: Number(this.newPriceForm.controls.nuevo_precio.value),
    };
    this.dialogRef.close({fuel: new_fuel, prevprice: this.precio_anterior});
  }

  onSelectedFuelChange(fuelType: string) {
    this.precio_anterior = this.newPriceForm.controls.fuelType.value.precio;
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(null);   // Close the dialog 	  this.dialogRef.close(null);  // or simply.close()
  }
}
