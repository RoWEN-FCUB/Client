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
  fecha: string = '';
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
  }

  addProduct() {
    this.productos[this.producto_seleccionado].cantidad = Number(this.cantidad);
    this.newReceipt.productos.push(this.productos[this.producto_seleccionado]);
    this.newReceipt.precio_total = 0;
    for (let i = 0; i < this.newReceipt.productos.length; i++) {
      this.newReceipt.precio_total += (this.newReceipt.productos[i].precio * this.newReceipt.productos[i].cantidad);
    }
  }

  deleteProduct(index: number) {
    this.newReceipt.productos.splice(index, 1);
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

  save() {
    this.newReceipt.fecha_emision = moment.utc(this.fecha).toDate();
    this.newReceipt.provincia = this.provincias[this.provincia_seleccionada].nombre;
    this.newReceipt.municipio = this.municipios[this.municipio_seleccionado];
    this.comercialService.createReceipt(this.newReceipt).subscribe(res => {
      this.dialogRef.close(this.newReceipt);
    });
  }

}
