import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CProduct } from '../../models/CProduct';
import { CProvider } from '../../models/CProvider';
import { ComercialService } from '../../services/comercial.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-cproduct',
  templateUrl: './new-cproduct.component.html',
  styleUrls: ['./new-cproduct.component.css'],
})
export class NewCproductComponent implements OnInit {
  proovedor_seleccionado: number = 0;
  newCProduct: CProduct = {
    id_proveedor : this.proovedor_seleccionado,
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

  constructor(private comercialService: ComercialService, private http: HttpClient, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  codigo_change() {

  }

  name_change() {

  }

  precio_change() {

  }

  um_change() {

  }

  mlc_change(e) {

  }

  close() {
    this.dialogRef.close(null);
  }

  save() {

  }

}
