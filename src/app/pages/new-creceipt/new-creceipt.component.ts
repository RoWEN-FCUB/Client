import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CProduct } from '../../models/CProduct';
import { CReceipt } from '../../models/CReceipt';
import { ComercialService } from '../../services/comercial.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { CProvider } from '../../models/CProvider';
import * as moment from 'moment';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-creceipt',
  templateUrl: './new-creceipt.component.html',
  styleUrls: ['./new-creceipt.component.css'],
})
export class NewCreceiptComponent implements OnInit {
  fecha;
  editable: boolean = false;
  title: string = '';
  proveedor: CProvider;
  productos: CProduct[];
  producto_seleccionado: number = -1;
  cantidad: number = 0;
  provincia_seleccionada = -1;
  municipio_seleccionado = -1;
  municipios: string[] = [];
  provincias = [
  {
    nombre: 'Municipio especial',
    municipios: ['Isla de la Juventud'],
  },
  {
    nombre: 'Pinar del Río',
    municipios: ['Consolación del Sur', 'Guane', 'La Palma', 'Los Palacios', 'Mantua', 'Minas de Matahambre', 'Pinar del Río', 'San Juan y Martínez', 'San Luis', 'Sandino', 'Viñales'],
  }, {
    nombre: 'Artemisa',
    municipios: ['Alquízar', 'Artemisa', 'Bauta', 'Caimito', 'Guanajay', 'Güira de Melena', 'Mariel', 'San Antonio de los Baños', 'Bahía Honda', 'San Cristóbal', 'Candelaria'],
  }, {
    nombre: 'Mayabeque',
    municipios: ['Batabanó', 'Bejucal', 'Güines', 'Jaruco', 'Madruga', 'Melena del Sur', 'Nueva Paz', 'Quivicán', 'San José de las Lajas', 'San Nicolás de Bari', 'Santa Cruz del Norte'],
  }, {
    nombre: 'La Habana',
    municipios: ['Arroyo Naranjo', 'Boyeros', 'Centro Habana', 'Cerro', 'Cotorro', 'Diez de Octubre', 'Guanabacoa', 'Habana del Este', 'Habana Vieja', 'La Lisa', 'Marianao', 'Playa', 'Plaza', 'Regla', 'San Miguel del Padrón']
  }, {
    nombre: 'Matanzas',
    municipios: ['Calimete', 'Cárdenas', 'Ciénaga de Zapata', 'Colón', 'Jagüey Grande', 'Jovellanos', 'Limonar', 'Los Arabos', 'Martí', 'Matanzas', 'Pedro Betancourt', 'Perico', 'Unión de Reyes'],
  }, {
    nombre: 'Villa Clara',
    municipios: ['Caibarién', 'Camajuaní', 'Cifuentes', 'Corralillo', 'Encrucijada', 'Manicaragua', 'Placetas', 'Quemado de Güines', 'Ranchuelo', 'Remedios', 'Sagua la Grande', 'Santa Clara', 'Santo Domingo'],
  }, {
    nombre: 'Cienfuegos',
    municipios: ['Abreus', 'Aguada de Pasajeros', 'Cienfuegos', 'Cruces', 'Cumanayagua', 'Palmira', 'Rodas', 'Santa Isabel de las Lajas'],
  }, {
    nombre: 'Sancti Spíritus',
    municipios: ['Cabaigúan', 'Fomento', 'Jatibonico', 'La Sierpe', 'Sancti Spíritus', 'Taguasco', 'Trinidad', 'Yaguajay'],
  }, {
    nombre: 'Ciego de Ávila',
    municipios: ['Ciro Redondo', 'Baraguá', 'Bolivia', 'Chambas', 'Ciego de Ávila', 'Florencia', 'Majagua', 'Morón', 'Primero de Enero', 'Venezuela'],
  }, {
    nombre: 'Camagüey',
    municipios: ['Camagüey', 'Carlos Manuel de Céspedes', 'Esmeralda', 'Florida', 'Guaimaro', 'Jimagüayú', 'Minas', 'Najasa', 'Nuevitas', 'Santa Cruz del Sur', 'Sibanicú', 'Sierra de Cubitas', 'Vertientes'],
  }, {
    nombre: 'Las Tunas',
    municipios: ['Amancio Rodríguez', 'Colombia', 'Jesús Menéndez', 'Jobabo', 'Las Tunas', 'Majibacoa', 'Manatí', 'Puerto Padre'],
  }, {
    nombre: 'Holguín',
    municipios: ['Antilla', 'Báguanos', 'Banes', 'Cacocum', 'Calixto García', 'Cueto', 'Frank País', 'Gibara', 'Holguín', 'Mayarí', 'Moa', 'Rafael Freyre', 'Sagua de Tánamo', 'Urbano Noris'],
  }, {
    nombre: 'Granma',
    municipios: ['Bartolomé Masó', 'Bayamo', 'Buey Arriba', 'Campechuela', 'Cauto Cristo', 'Guisa', 'Jiguaní', 'Manzanillo', 'Media Luna', 'Niquero', 'Pilón', 'Río Cauto', 'Yara'],
  }, {
    nombre: 'Santiago de Cuba',
    municipios: ['Contramaestre', 'Guamá', 'Julio Antonio Mella', 'Palma Soriano', 'San Luis', 'Santiago de Cuba', 'Segundo Frente', 'Songo la Maya', 'Tercer Frente'],
  }, {
    nombre: 'Guantánamo',
    municipios: ['Baracoa', 'Caimanera', 'El Salvador', 'Guantánamo', 'Imías', 'Maisí', 'Manuel Tames', 'Niceto Pérez', 'San Antonio del Sur', 'Yateras'],
  }];
  newReceipt: CReceipt = {
    pedido: '',
    id_proveedor: 0,
    precio_total: 0,
    comprador: '',
    destinatario: '',
    destinatario_direccion: '',
    destinatario_telefono: '',
    marcado_conciliar: false,
    conciliado: false,
    entregado: false,
    fecha_emision: new Date(),
    costo_envio: 0,
    provincia: '',
    municipio: '',
    productos: [],
  };
  provincia_status: string = 'info';
  municipio_status: string = 'info';
  pedido_status: string = 'info';
  fecha_status: string = 'info';
  comprador_status: string = 'info';
  destinatario_status: string = 'info';
  direccion_status: string = 'info';
  telefono_status: string = 'info';
  cantidad_status: string = 'info';

  constructor(private comercialService: ComercialService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
    if (!this.newReceipt.id) {
      this.newReceipt.id_proveedor = this.proveedor.id;
      for (let i = 0; i < this.provincias.length; i++) {
        if (this.proveedor.provincia === this.provincias[i].nombre) {
          this.provincia_seleccionada = i;
          this.municipios = this.provincias[this.provincia_seleccionada].municipios;
          break;
        }
      }
      if (this.provincia_seleccionada >= 0) {
        for (let i = 0; i < this.provincias[this.provincia_seleccionada].municipios.length; i++) {
          if (this.proveedor.municipio === this.provincias[this.provincia_seleccionada].municipios[i]) {
            this.municipio_seleccionado = i;
            break;
          }
        }
      }
    } else {
      this.comercialService.getReceiptProducts(this.newReceipt.id).subscribe((res: CProduct[]) => {
        this.newReceipt.productos = res;
      });
      this.fecha = new Date(this.newReceipt.fecha_emision);
      this.fecha = this.convertUTCDateToLocalDate(this.fecha);
      for (let i = 0; i < this.provincias.length; i++) {
        if (this.newReceipt.provincia === this.provincias[i].nombre) {
          this.provincia_seleccionada = i;
          this.municipios = this.provincias[this.provincia_seleccionada].municipios;
          break;
        }
      }
      if (this.provincia_seleccionada >= 0) {
        for (let i = 0; i < this.provincias[this.provincia_seleccionada].municipios.length; i++) {
          if (this.newReceipt.municipio === this.provincias[this.provincia_seleccionada].municipios[i]) {
            this.municipio_seleccionado = i;
            break;
          }
        }
      }
    }
  }

  increase_product(index: number) {
    this.newReceipt.productos[index].cantidad++;
    this.total_price();
  }

  decrease_product(index: number) {
    if (this.newReceipt.productos[index].cantidad > 1) {
      this.newReceipt.productos[index].cantidad--;
    } else {
      this.deleteProduct(index);
    }
    this.total_price();
  }

  convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }

  pedido_change() {
    if (this.newReceipt.pedido) {
      this.pedido_status = 'success';
    } else {
      this.pedido_status = 'danger';
    }
  }

  fecha_change(e) {
    // console.log(this.fecha);
    if (e) {
      this.fecha_status = 'success';
    } else {
      this.fecha_status = 'danger';
    }
  }

  comprador_change() {
    const nameregexp = new RegExp(/^([A-Za-záéíóúÁÉÍÓÚñÑ]+\s?)+$/);
    if (nameregexp.test(this.newReceipt.comprador)) {
      this.comprador_status = 'success';
    } else {
      this.comprador_status = 'danger';
    }
  }

  destinatario_change() {
    const nameregexp = new RegExp(/^([A-Za-záéíóúÁÉÍÓÚñÑ]+\s?)+$/);
    if (nameregexp.test(this.newReceipt.destinatario)) {
      this.destinatario_status = 'success';
    } else {
      this.destinatario_status = 'danger';
    }
  }

  direccion_change() {
    if (this.newReceipt.destinatario_direccion) {
      this.direccion_status = 'success';
    } else {
      this.direccion_status = 'danger';
    }
  }

  telefono_change() {
    if (this.newReceipt.destinatario_telefono) {
      this.telefono_status = 'success';
    } else {
      this.telefono_status = 'danger';
    }
  }

  cantidad_change() {
    const cantregexp = new RegExp(/^([1-9]+[0-9]*\s?)+$/);
    if (cantregexp.test(this.cantidad.toString())) {
      this.cantidad_status = 'success';
    } else {
      this.cantidad_status = 'danger';
    }
  }

  addProduct() {
    this.productos[this.producto_seleccionado].cantidad = Number(this.cantidad);
    let found: boolean = false;
    for (let i = 0; i < this.newReceipt.productos.length; i++) {
      if (this.newReceipt.productos[i].codigo === this.productos[this.producto_seleccionado].codigo) {
        this.newReceipt.productos[i].cantidad += Number(this.cantidad);
        found = true;
        break;
      }
    }
    if (!found) {
      this.newReceipt.productos.push(this.productos[this.producto_seleccionado]);
    }
    this.total_price();
  }

  deleteProduct(index: number) {
    this.newReceipt.productos.splice(index, 1);
    this.total_price();
  }

  total_price() {
    this.newReceipt.precio_total = 0;
    for (let i = 0; i < this.newReceipt.productos.length; i++) {
      this.newReceipt.precio_total += (this.newReceipt.productos[i].precio * this.newReceipt.productos[i].cantidad);
    }
  }

  cambiarmunicipios() {
    this.municipio_seleccionado = -1;
    this.municipio_status = 'danger';
    this.municipios = this.provincias[this.provincia_seleccionada].municipios;
    if (this.provincia_seleccionada >= 0) {
      this.provincia_status = 'success';
    } else {
      this.provincia_status = 'danger';
    }
  }

  seleccionarMunicipio() {
    if (this.municipio_seleccionado >= 0) {
      this.municipio_status = 'success';
    } else {
      this.municipio_status = 'danger';
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  validate(): boolean {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.pedido_status === 'danger' || this.newReceipt.pedido === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de pedido válido.',
      } as SweetAlertOptions);
      this.pedido_status = 'danger';
      return false;
    } else if (this.fecha_status === 'danger' || this.fecha === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar una fecha.',
      } as SweetAlertOptions);
      this.fecha_status = 'danger';
      return false;
    } else if (this.comprador_status === 'danger' || this.newReceipt.comprador === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre del comprador.',
      } as SweetAlertOptions);
      this.comprador_status = 'danger';
      return false;
    } else if (this.destinatario_status === 'danger' || this.newReceipt.destinatario === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre del destinatario.',
      } as SweetAlertOptions);
      this.destinatario_status = 'danger';
      return false;
    } else if (this.direccion_status === 'danger' || this.newReceipt.destinatario_direccion === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir la dirección del destinatario.',
      } as SweetAlertOptions);
      this.direccion_status = 'danger';
      return false;
    } else if (this.telefono_status === 'danger' || this.newReceipt.destinatario_telefono === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir el número de teléfono del destinatario.',
      } as SweetAlertOptions);
      this.telefono_status = 'danger';
      return false;
    } else if (this.newReceipt.productos.length < 1) {
      Toast.fire({
        icon: 'error',
        title: 'Debe añadir productos al vale.',
      } as SweetAlertOptions);
    } else {
      return true;
    }
    return false;
  }

  save() {
    if (this.validate()) {
      if (this.newReceipt.id) {
        this.newReceipt.provincia = this.provincias[this.provincia_seleccionada].nombre;
        this.newReceipt.municipio = this.municipios[this.municipio_seleccionado];
        this.newReceipt.fecha_emision = moment.utc(this.fecha).toDate();
        this.comercialService.updateReceipt(this.newReceipt, this.newReceipt.id).subscribe(res => {
          this.dialogRef.close(this.newReceipt);
        });
      } else {
        this.newReceipt.fecha_emision = moment.utc(this.fecha).toDate();
        this.newReceipt.provincia = this.provincias[this.provincia_seleccionada].nombre;
        this.newReceipt.municipio = this.municipios[this.municipio_seleccionado];
        this.comercialService.createReceipt(this.newReceipt).subscribe(res => {
          this.dialogRef.close(this.newReceipt);
        });
      }
    }
  }

}
