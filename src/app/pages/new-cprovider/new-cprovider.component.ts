import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CProvider } from '../../models/CProvider';
import { ComercialService } from '../../services/comercial.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-cprovider',
  templateUrl: './new-cprovider.component.html',
  styleUrls: ['./new-cprovider.component.css'],
})
export class NewCproviderComponent implements OnInit {
  id_serv: number;
  newProvider: CProvider = {
    id_serv: 0,
    nombre: '',
    reeup: '',
    siglas: '',
  };
  name_status: string = 'info';
  reeup_status = 'info';
  siglas_status = 'info';
  provincia_status: string = 'info';
  municipio_status: string = 'info';
  proovedor_seleccionado: number;
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

  constructor(private comercialService: ComercialService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
    this.newProvider.id_serv = this.id_serv;
    if (this.newProvider.id) {
      for (let i = 0; i < this.provincias.length; i++) {
        if (this.newProvider.provincia === this.provincias[i].nombre) {
          this.provincia_seleccionada = i;
          this.municipios = this.provincias[this.provincia_seleccionada].municipios;
          break;
        }
      }
      if (this.provincia_seleccionada >= 0) {
        for (let i = 0; i < this.provincias[this.provincia_seleccionada].municipios.length; i++) {
          if (this.newProvider.municipio === this.provincias[this.provincia_seleccionada].municipios[i]) {
            this.municipio_seleccionado = i;
            break;
          }
        }
      }
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

  name_change() {
    if (!this.newProvider.nombre) {
      this.name_status = 'danger';
    } else {
      this.name_status = 'success';
    }
  }

  siglas_change() {
    const nickregexp = new RegExp(/^[A-Z0-9ÁÉÍÓÚÑ\s]{2,50}$/);
    if (nickregexp.test(this.newProvider.siglas)) {
      this.siglas_status = 'success';
    } else {
      this.siglas_status = 'danger';
    }
  }

  reeup_change() {
    const nickregexp = new RegExp(/^[0-9]{3}\.[0-9]{1}\.[0-9]{5}$/);
    if (nickregexp.test(this.newProvider.reeup)) {
      this.reeup_status = 'success';
    } else {
      this.reeup_status = 'danger';
    }
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
    this.newProvider.provincia = this.provincias[this.provincia_seleccionada].nombre;
    this.newProvider.municipio = this.provincias[this.provincia_seleccionada].municipios[this.municipio_seleccionado];
    if (!this.newProvider.siglas || this.siglas_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe introducir siglas válidas.',
      } as SweetAlertOptions);
      this.siglas_status = 'danger';
    } else if (!this.newProvider.reeup || this.reeup_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe introducir un código reeup válido.',
      } as SweetAlertOptions);
      this.reeup_status = 'danger';
    } else if (!this.newProvider.nombre || this.name_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe introducir un nombre válido.',
      } as SweetAlertOptions);
      this.name_status = 'danger';
    } else if (this.provincia_status === 'danger' || this.provincia_seleccionada < 0) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar una provincia.',
      } as SweetAlertOptions);
      this.provincia_status = 'danger';
    } else if (this.municipio_status === 'danger' || this.municipio_seleccionado < 0) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar un municipio.',
      } as SweetAlertOptions);
      this.municipio_status = 'danger';
    } else {
      if (!this.newProvider.id) {
        this.comercialService.createProvider(this.newProvider).subscribe(res => {
          this.dialogRef.close(this.newProvider);
        });
      } else {
        this.comercialService.updateProvider(this.newProvider, this.newProvider.id).subscribe( res => {
          this.dialogRef.close(this.newProvider);
        });
      }
    }
  }

}
