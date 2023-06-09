import { Component } from '@angular/core';
import { GeeService } from '../../services/gee.service';
import { FCard } from '../../models/FCard';
import { GEE } from '../../models/GEE';
import { NbDialogRef } from '@nebular/theme';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'admin-fcard',
  templateUrl: './admin-fcard.component.html',
  styleUrls: ['./admin-fcard.component.scss']
})
export class AdminFcardComponent {
  gee: GEE = {};
  cards: FCard[] = [];

  constructor(private geeService: GeeService, protected dialogRef: NbDialogRef<any>) {}

  async ngOnInit(): Promise<void> {
    await this.listCards();
  }

  async listCards() :Promise<any> {
    //get a list of all cards from geeService
    const data: any = await this.geeService.listCardsByGEE(this.gee.id).then((data: FCard[]) => {
      this.cards = data;
    });    
    return data;
    /*this.geeService.listCardsByGEE(this.gee.id).subscribe(
      (data: FCard[]) => {
        this.cards = data;
      }
    );*/
  }

  deleteCard(card: FCard) {
    Swal.fire({
      title: 'Confirma que desea eliminar la tarjeta "' + card.numero + '"?',
      text: 'Se eliminarán todos sus datos del sistema, incluido el registro de operaciones.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.geeService.deleteFuelCard(card.id).subscribe(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Tarjeta eliminada correctamente.',
          } as SweetAlertOptions);
          this.listCards();
        });
      }
    });
  }

  close() {
    this.dialogRef.close(null);
  }
}
