import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbTabComponent, NbTabsetComponent } from '@nebular/theme';
import { EService } from '../../models/EService';
import { Company } from '../../models/Company';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { EserviceService } from '../../services/eservice.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css'],
})

export class NewServiceComponent implements OnInit {

  companies: Company[];
  newService: EService = {
    nombre: '',
    id_emp: -1,
    nombre_emp: '',
    provincia: '',
    municipio: '',
    reup: '',
    codcli: '',
    control: '',
    ruta: '',
    folio: '',
    bitacora: false,
    triple_registro: false,
    aplica_acomodo: false,
    pico_nocturno: false,
    total_desconectivos: 0,
    desc_gen_dia: 0,
    desc_gen_noche: 0,
    desc_parc_dia: 0,
    desc_parc_noche: 0,
    latitud: 0,
    longitud: 0,
  };
  title: string;
  nombre_emp_status = 'info';
  nombre_status = 'info';
  provincia_status = 'info';
  municipio_status = 'info';
  reup_status = 'info';
  codcli_status = 'info';
  control_status = 'info';
  ruta_status = 'info';
  folio_status = 'info';
  tdesc_status = 'info';
  descGD_status = 'info';
  descPD_status = 'info';
  descGN_status = 'info';
  descPN_status = 'info';
  provincia_seleccionada = -1;
  municipio_seleccionado = -1;
  empresa_seleccionada = -1;
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

  @ViewChild('tabset') tabsetEl: NbTabsetComponent;
  @ViewChild('Tab1') Tab1El: NbTabComponent;
  @ViewChild('Tab2') Tab2El: NbTabComponent;

  constructor(protected dialogRef: NbDialogRef<any>, private eserviceService: EserviceService) { }

  ngOnInit(): void {
    this.empresa_seleccionada = this.newService.id_emp;
    if (this.newService.id) {
      for (let i = 0; i < this.provincias.length; i++) {
        if (this.newService.provincia === this.provincias[i].nombre) {
          this.provincia_seleccionada = i;
          this.municipios = this.provincias[this.provincia_seleccionada].municipios;
          break;
        }
      }
      if (this.provincia_seleccionada >= 0) {
        for (let i = 0; i < this.provincias[this.provincia_seleccionada].municipios.length; i++) {
          if (this.newService.municipio === this.provincias[this.provincia_seleccionada].municipios[i]) {
            this.municipio_seleccionado = i;
            break;
          }
        }
      }
    }
  }

  reup_change() {
    const nickregexp = new RegExp(/^[0-9]{3}\.[0-9]{1}\.[0-9]{5}$/);
    if (nickregexp.test(this.newService.reup)) {
      this.reup_status = 'success';
    } else {
      this.reup_status = 'danger';
    }
  }

  bitacora_change(e: boolean) {
    this.newService.bitacora = e;
  }

  tripleR_change(e: boolean) {
    this.newService.triple_registro = e;
  }

  acomodo_change(e: boolean) {
    this.newService.aplica_acomodo = e;
  }

  picoN_change(e: boolean) {
    this.newService.pico_nocturno = e;
  }

  picoD_change(e: boolean) {
    this.newService.pico_diurno = e;
  }

  tdesc_change() {
    if (!isNaN(this.newService.total_desconectivos)) {
      this.tdesc_status = 'success';
    } else {
      this.tdesc_status = 'danger';
    }
  }

  descGD_change() {
    if (!isNaN(this.newService.desc_gen_dia)) {
      this.descGD_status = 'success';
    } else {
      this.descGD_status = 'danger';
    }
  }

  descPD_change() {
    if (!isNaN(this.newService.desc_parc_dia)) {
      this.descPD_status = 'success';
    } else {
      this.descPD_status = 'danger';
    }
  }

  descGN_change() {
    if (!isNaN(this.newService.desc_gen_noche)) {
      this.descGN_status = 'success';
    } else {
      this.descGN_status = 'danger';
    }
  }

  descPN_change() {
    if (!isNaN(this.newService.desc_parc_noche)) {
      this.descPN_status = 'success';
    } else {
      this.descPN_status = 'danger';
    }
  }

  nombre_change() {
    if (this.newService.nombre) {
      this.nombre_status = 'success';
    } else {
      this.nombre_status = 'danger';
    }
  }

  cambiarEmpresa() {
    this.newService.id_emp = this.empresa_seleccionada;
    if (this.empresa_seleccionada >= 0) {
      this.nombre_emp_status = 'success';
    } else {
      this.nombre_emp_status = 'danger';
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
      type city = Array<{ name: string; latitude: number, longitude: number, country: string, state: string}>;
      this.eserviceService.getGeo(this.municipios[this.municipio_seleccionado]).subscribe((res: city) => {
        if (res) {
          console.log(res[0]);
          this.newService.latitud = res[0].latitude;
          this.newService.longitud = res[0].longitude;
        }
      });
    } else {
      this.municipio_status = 'danger';
    }
  }

  codcli_change() {
    if (this.newService.codcli) {
      this.codcli_status = 'success';
    } else {
      this.codcli_status = 'danger';
    }
  }

  control_change() {
    if (this.newService.control) {
      this.control_status = 'success';
    } else {
      this.control_status = 'danger';
    }
  }

  ruta_change() {
    if (this.newService.ruta) {
      this.ruta_status = 'success';
    } else {
      this.ruta_status = 'danger';
    }
  }

  folio_change() {
    if (this.newService.folio) {
      this.folio_status = 'success';
    } else {
      this.folio_status = 'danger';
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
    this.newService.provincia = this.provincias[this.provincia_seleccionada].nombre;
    this.newService.municipio = this.provincias[this.provincia_seleccionada].municipios[this.municipio_seleccionado];
    if (!this.newService.id) {
      delete this.newService.nombre_emp;
      this.eserviceService.saveService(this.newService).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Servicio creado correctamente.',
        } as SweetAlertOptions);
        this.close();
      });
    } else {
      delete this.newService.nombre_emp;
      this.eserviceService.updateService(this.newService.id, this.newService).subscribe(res => {
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
    if (this.nombre_emp_status === 'danger' || this.newService.id_emp < 0) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar la empresa a la que pertenece el nuevo servicio.',
      } as SweetAlertOptions);
      this.nombre_emp_status = 'danger';
      this.tabsetEl.selectTab(this.Tab1El);
    } else if (this.nombre_status === 'danger' || this.newService.nombre === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un nombre válido.',
      } as SweetAlertOptions);
      this.nombre_status = 'danger';
      this.tabsetEl.selectTab(this.Tab1El);
    } else if (this.provincia_status === 'danger' || this.provincia_seleccionada < 0) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar una provincia.',
      } as SweetAlertOptions);
      this.provincia_status = 'danger';
      this.tabsetEl.selectTab(this.Tab1El);
    } else if (this.municipio_status === 'danger' || this.municipio_seleccionado < 0) {
      Toast.fire({
        icon: 'error',
        title: 'Debe seleccionar un municipio.',
      } as SweetAlertOptions);
      this.municipio_status = 'danger';
      this.tabsetEl.selectTab(this.Tab1El);
    } else if (this.reup_status === 'danger' || this.newService.reup === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un código REEUP válido.',
      } as SweetAlertOptions);
      this.reup_status = 'danger';
    }  else if (this.codcli_status === 'danger' || this.newService.codcli === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un código de cliente válido.',
      } as SweetAlertOptions);
      this.codcli_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    }  else if (this.control_status === 'danger' || this.newService.control === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un control válido.',
      } as SweetAlertOptions);
      this.control_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    } else if (this.ruta_status === 'danger' || this.newService.ruta === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una ruta válida.',
      } as SweetAlertOptions);
      this.ruta_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    } else if (this.folio_status === 'danger' || this.newService.folio === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un folio válido.',
      } as SweetAlertOptions);
      this.folio_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    } else if (this.descGD_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de desconectivos generales válido para el horario diurno.',
      } as SweetAlertOptions);
      this.descGD_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    } else if (this.descPD_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de desconectivos parciales válido para el horario diurno.',
      } as SweetAlertOptions);
      this.descPD_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    } else if (this.descGN_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de desconectivos generales válido para el horario nocturno.',
      } as SweetAlertOptions);
      this.descGN_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    } else if (this.descPN_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de desconectivos parciales válido para el horario nocturno.',
      } as SweetAlertOptions);
      this.descPN_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    } else if (this.tdesc_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de desconectivos válido.',
      } as SweetAlertOptions);
      this.tdesc_status = 'danger';
      this.tabsetEl.selectTab(this.Tab2El);
    } else {
      this.save();
    }
  }

}
