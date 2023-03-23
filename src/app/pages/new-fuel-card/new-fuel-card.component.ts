import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'new-fuel-card',
  templateUrl: './new-fuel-card.component.html',
  styleUrls: ['./new-fuel-card.component.scss']
})
export class NewFuelCardComponent implements OnInit {

  magneticCardForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

}
