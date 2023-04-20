import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { GEE } from '../../models/GEE';
import { GeeService } from '../../services/gee.service';
import { NewGeeComponent } from '../new-gee/new-gee.component';
import { FuelPriceComponent } from '../fuel-price/fuel-price.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin-gee',
  templateUrl: './admin-gee.component.html',
  styleUrls: ['./admin-gee.component.scss']
})
export class AdminGeeComponent implements OnInit {
  gees: GEE[];
  fuelPrices: any = {
    precio_dregular: 0,
    precio_gregular: 0,
  };
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: ''};
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 3000,
  });

  constructor(private authService: NbAuthService, private geeService: GeeService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
    });
    this.getGEEs();
    this.geeService.getFuelPrices().subscribe(res => {
      this.fuelPrices = res;
    });
  }

  getGEEs() {
    this.geeService.listGEEs().subscribe((gees: GEE[]) => {
      this.gees = gees;
    });
  }

  openNew() {
    this.dialogService.open(NewGeeComponent, {context: {title: 'Nuevo GEE'}}).onClose.subscribe(res => {
      this.getGEEs();
    });
  }

  openAssociatedCards(i: number) {
    this.dialogService.open(AdminGeeComponent, {context: {}}).onClose.subscribe(res => {
      
    });
  }

  openChangePrice() {
    this.dialogService.open(FuelPriceComponent, {context: {fuelPrices: this.fuelPrices}}).onClose.subscribe(res => {
      if (res) {
        console.log(res);
        const datos = {
          prevPrice: res.prevPrice,
          newPrice: res.newPrice,
          fuelType: res.fuelType,
          id_usuario: this.user.id,
        }
        this.geeService.changeFuelPrice(datos).subscribe(res => {
          this.Toast.fire({
            icon:'success',
            title: 'Precio actualizado correctamente. Se adicionó un nuevo registro para cada tarjeta de ' + datos.fuelType,
          } as SweetAlertOptions);
        });
      }
    });
  }

  openEdit(id: number) {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewGeeComponent, {context: {title: 'Editar grupo ' + this.gees[id].idgee, newGEE: this.gees[id]}}).onClose.subscribe(res => {
      this.getGEEs();
    });
  }

  deleteGEE(id: number) {
    Swal.fire({
      title: 'Confirma que desea eliminar el grupo "' + this.gees[id].idgee + '"?',
      text: 'Se eliminarán todos sus datos del sistema incluyendo el registro de operaciones.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.geeService.deleteGEE(this.gees[id].id).subscribe(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Grupo eliminado correctamente.',
          } as SweetAlertOptions);
          this.getGEEs();
        });
      }
    });
  }

}
