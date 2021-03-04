import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CProduct } from '../../models/CProduct';
import { ComercialService } from '../../services/comercial.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-cproduct',
  templateUrl: './new-cproduct.component.html',
  styleUrls: ['./new-cproduct.component.css'],
})
export class NewCproductComponent implements OnInit {
  proovedor_seleccionado: number;
  newCProduct: CProduct = {
    id_proveedor : 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    unidad_medida: '',
    precio: 0,
    mlc: false,
  };
  codigo_status: string = 'info';
  name_status: string = 'info';
  precio_status: string = 'info';
  um_status: string = 'info';

  constructor(private comercialService: ComercialService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
    this.newCProduct.id_proveedor = this.proovedor_seleccionado;
  }

  codigo_change() {
    if (!this.newCProduct.codigo) {
      this.codigo_status = 'danger';
    } else {
      this.codigo_status = 'success';
    }
  }

  name_change() {
    if (!this.newCProduct.nombre) {
      this.name_status = 'danger';
    } else {
      this.name_status = 'success';
    }
  }

  precio_change() {
    const priceregexp = new RegExp(/^[0-9]{1}[0-9]*((\.[0-9]+)|[0-9]*)$/);
    if (priceregexp.test(this.newCProduct.precio.toString())) {
      this.precio_status = 'success';
    } else {
      this.precio_status = 'danger';
    }
  }

  um_change() {
    if (!this.newCProduct.unidad_medida) {
      this.um_status = 'danger';
    } else {
      this.um_status = 'success';
    }
  }

  mlc_change(e) {
    this.newCProduct.mlc = e;
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.codigo_status === 'danger' || !this.newCProduct.codigo) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un código válido.',
      } as SweetAlertOptions);
      this.codigo_status = 'danger';
    } else if (this.name_status === 'danger' || !this.newCProduct.nombre) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un nombre válido.',
      } as SweetAlertOptions);
      this.name_status = 'danger';
    } else if (this.um_status === 'danger' || !this.newCProduct.unidad_medida) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una unidad de medida válida.',
      } as SweetAlertOptions);
      this.um_status = 'danger';
    } else if (this.precio_status === 'danger' || !this.newCProduct.precio) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un precio válido.',
      } as SweetAlertOptions);
      this.precio_status = 'danger';
    } else {
      if (!this.newCProduct.id) {
        this.comercialService.createProduct(this.newCProduct).subscribe( res => {
          this.dialogRef.close(this.newCProduct);
        });
      } else {
        this.comercialService.updateProduct(this.newCProduct, this.newCProduct.id).subscribe( res => {
          this.dialogRef.close(this.newCProduct);
        });
      }
    }
  }

}
