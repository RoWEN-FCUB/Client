import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Company } from '../../models/Company';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { CompanyService } from '../../services/company.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css'],
})
export class NewCompanyComponent implements OnInit {

  companies: Company[];
  newCompany: Company = {
    siglas: '',
    nombre: '',
    provincia: '',
    municipio: '',
    oace: '',
    osde: '',
    codcli: '',
    control: '',
    ruta: '',
    folio: '',
    email: '',
  };
  title: string;
  siglas_status = 'info';
  nombre_status = 'info';
  provincia_status = 'info';
  municipio_status = 'info';
  oace_status = 'info';
  osde_status = 'info';
  codcli_status = 'info';
  control_status = 'info';
  ruta_status = 'info';
  folio_status = 'info';
  email_status = 'info';
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

  constructor(protected dialogRef: NbDialogRef<any>, private companyService: CompanyService) { }

  ngOnInit(): void {
    if (this.newCompany.id) {
      for (let i = 0; i < this.provincias.length; i++) {
        if (this.newCompany.provincia === this.provincias[i].nombre) {
          this.provincia_seleccionada = i;
          this.municipios = this.provincias[this.provincia_seleccionada].municipios;
          break;
        }
      }
      if (this.provincia_seleccionada >= 0) {
        for (let i = 0; i < this.provincias[this.provincia_seleccionada].municipios.length; i++) {
          if (this.newCompany.municipio === this.provincias[this.provincia_seleccionada].municipios[i]) {
            this.municipio_seleccionado = i;
            break;
          }
        }
      }
    }
  }

  siglas_change() {
    const nickregexp = new RegExp(/^[a-zA-Z0-9záéíóúñÑ\s]{4,50}$/);
    if (nickregexp.test(this.newCompany.siglas)) {
      this.siglas_status = 'success';
    } else {
      this.siglas_status = 'danger';
    }
  }

  nombre_change() {
    const nickregexp = new RegExp(/^([A-ZÑa-z]{1}[a-záéíóúñ]+\s?)+$/);
    if (nickregexp.test(this.newCompany.nombre)) {
      this.nombre_status = 'success';
    } else {
      this.nombre_status = 'danger';
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

  oace_change() {
    const nickregexp = new RegExp(/^([A-ZÑa-záéíóúñ]+\s?)+$/);
    if (nickregexp.test(this.newCompany.oace)) {
      this.oace_status = 'success';
    } else {
      this.oace_status = 'danger';
    }
  }

  osde_change() {
    const nickregexp = new RegExp(/^([A-ZÑa-záéíóúñ]+\s?)+$/);
    if (nickregexp.test(this.newCompany.osde)) {
      this.osde_status = 'success';
    } else {
      this.osde_status = 'danger';
    }
  }

  codcli_change() {
    const nickregexp = new RegExp(/^[a-zA-Z0-9\s]{1,50}$/);
    if (nickregexp.test(this.newCompany.codcli)) {
      this.codcli_status = 'success';
    } else {
      this.codcli_status = 'danger';
    }
  }

  control_change() {
    const nickregexp = new RegExp(/^[a-zA-Z0-9\s]{1,50}$/);
    if (nickregexp.test(this.newCompany.control)) {
      this.control_status = 'success';
    } else {
      this.control_status = 'danger';
    }
  }

  ruta_change() {
    const nickregexp = new RegExp(/^[a-zA-Z0-9\s]{1,50}$/);
    if (nickregexp.test(this.newCompany.ruta)) {
      this.ruta_status = 'success';
    } else {
      this.ruta_status = 'danger';
    }
  }

  folio_change() {
    const nickregexp = new RegExp(/^[a-zA-Z0-9\s]{1,50}$/);
    if (nickregexp.test(this.newCompany.folio)) {
      this.folio_status = 'success';
    } else {
      this.folio_status = 'danger';
    }
  }

  email_change() {
    const emailregexp = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
    if (emailregexp.test(this.newCompany.email)) {
      this.email_status = 'success';
    } else {
      this.email_status = 'danger';
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
    this.newCompany.provincia = this.provincias[this.provincia_seleccionada].nombre;
    this.newCompany.municipio = this.provincias[this.provincia_seleccionada].municipios[this.municipio_seleccionado];
    if (!this.newCompany.id) {
      this.companyService.saveCompany(this.newCompany).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Empresa creada correctamente.',
        } as SweetAlertOptions);
        this.close();
      });
    } else {
      this.companyService.updateCompany(this.newCompany.id, this.newCompany).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Empresa actualizada correctamente.',
        } as SweetAlertOptions);
        this.close();
      });
    }
  }

  validate() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.siglas_status === 'danger' || this.newCompany.siglas === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir siglas válidas.',
      } as SweetAlertOptions);
      this.siglas_status = 'danger';
    } else if (this.nombre_status === 'danger' || this.newCompany.nombre === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un nombre válido.',
      } as SweetAlertOptions);
      this.nombre_status = 'danger';
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
    } else if (this.oace_status === 'danger' || this.newCompany.oace === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una OACE válida.',
      } as SweetAlertOptions);
      this.oace_status = 'danger';
    } else if (this.osde_status === 'danger' || this.newCompany.osde === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una OSDE válido.',
      } as SweetAlertOptions);
      this.osde_status = 'danger';
    } else if (this.codcli_status === 'danger' || this.newCompany.codcli === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un código de cliente válido.',
      } as SweetAlertOptions);
      this.codcli_status = 'danger';
    }  else if (this.control_status === 'danger' || this.newCompany.control === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un control válido.',
      } as SweetAlertOptions);
      this.control_status = 'danger';
    } else if (this.ruta_status === 'danger' || this.newCompany.ruta === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una ruta válida.',
      } as SweetAlertOptions);
      this.ruta_status = 'danger';
    } else if (this.folio_status === 'danger' || this.newCompany.folio === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un folio válido.',
      } as SweetAlertOptions);
      this.folio_status = 'danger';
    } else if (this.email_status === 'danger' || this.newCompany.email === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un servidor de correo válido.',
      } as SweetAlertOptions);
      this.email_status = 'danger';
    } else {
      this.save();
    }
  }

}
