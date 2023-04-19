import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'fuel-price',
  templateUrl: './fuel-price.component.html',
  styleUrls: ['./fuel-price.component.scss']
})
export class FuelPriceComponent {
  newPriceForm: UntypedFormGroup;
  fuelPrices: any = {
    precio_dregular: 0,
    precio_gregular: 0,
  };
  precio_anterior: number = 0;

  constructor(private fb: UntypedFormBuilder, protected dialogRef: NbDialogRef<any>) {
    this.newPriceForm = this.fb.group({
      fuelType: ['', Validators.required],
      nuevo_precio: ['', [Validators.pattern(/^(?!0\d)\d*(\.\d+)?(?:[1-9]0|0)?$/), Validators.required]],
    });
  }

  onSubmit() {
    // Lógica para enviar los datos al servidor
    this.dialogRef.close({fuelType: this.newPriceForm.controls.fuelType, newPrice: this.newPriceForm.controls.nuevo_precio.value});
  }

  onSelectedFuelChange(fuelType: string) {
    if (fuelType === 'Diesel Regular') {
      this.precio_anterior = this.fuelPrices.precio_dregular;
    } else if (fuelType === 'Gasolina') {
      this.precio_anterior = this.fuelPrices.precio_gregular;
    }
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(null);   // Close the dialog 	  this.dialogRef.close(null);  // or simply.close()
  }
}
