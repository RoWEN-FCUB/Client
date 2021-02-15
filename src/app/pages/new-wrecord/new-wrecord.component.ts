import { ChangeDetectionStrategy, Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbDialogRef } from '@nebular/theme';
import { WRecord } from '../../models/WRecord';
import { WClient } from '../../models/WClient';
import { WDevice } from '../../models/WDevice';
import { WPerson } from '../../models/WPerson';
import { WorkshopService } from '../../services/workshop.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-wrecord',
  templateUrl: './new-wrecord.component.html',
  styleUrls: ['./new-wrecord.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewWRecordComponent implements OnInit {

  @ViewChild('cli') clientinput: ElementRef;
  @ViewChild('mrc') marcinput: ElementRef;
  @ViewChild('dev') deviceinput: ElementRef;
  filteredClients$: Observable<WClient[]>;
  filteredDevices$: Observable<string[]>;
  filteredMarcs$: Observable<string[]>;
  clients: WClient[] = [];
  // devices: WDevice[] = [];
  devs: string[] = [];
  marcs: string[] = [];
  models: string[] = [];
  serials: string[] = [];
  inventaries: string[] = [];
  names: WPerson[] = [];
  newrecord: WRecord = {
    cliente: '',
    equipo: '',
    marca: '',
    modelo: '',
    inventario: '',
    serie: '',
    fecha_entrada: new Date(),
    entregado: '',
    especialista: '',
    cliente_nombre: '',
    estado: 'P',
    id_superior: 0,
    id_emp: 0,
    fallo: '',
    observaciones: '',
  };
  entrega: WPerson = {
    nombre: '',
    ci: '',
    cargo: '',
    id_cliente: 0,
  };
  entrega_ci_status: string = 'info';
  entrega_cargo_status: string = 'info';
  showPersonInfo: boolean = false;
  client_status: string = 'info';
  client_name_status: string = 'info';
  device_status: string = 'info';
  marc_status: string = 'info';
  model_status: string = 'info';
  inv_status: string = 'info';
  serial_status: string = 'info';
  date_received_status: string = 'info';
  deliver_status: string = 'info';
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_sup: 0, id_emp: 0};
  show_client_name: boolean = false;
  // tslint:disable-next-line: max-line-length
  constructor(private library: FaIconLibrary, protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService, private authService: NbAuthService) {
    this.library.addIcons(faTrashAlt);
   }

  ngOnInit() {
    // this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.workshopService.getWClients().subscribe((res: WClient[]) => {
      this.clients = res;
      this.filteredClients$ = of(this.clients);
      this.workshopService.getWDevices().subscribe((res2: WDevice[]) => {
        for (let i = 0; i < res2.length; i++) {
          this.devs.push(res2[i].equipo);
        }
        this.filteredDevices$ = of(this.devs);
        this.clientinput.nativeElement.focus();
        this.client_status = 'info';
        this.device_status = 'info';
        this.marc_status = 'info';
      });
    });
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.newrecord.id_emp = this.user.id_emp;
      this.newrecord.especialista = this.user.fullname;
      this.newrecord.id_superior = this.user.id_sup;
    });
  }

  clearClientInput() {
    this.newrecord.cliente = '';
    this.clientinput.nativeElement.focus();
  }

  clearDeviceInput() {
    this.newrecord.equipo = '';
    this.deviceinput.nativeElement.focus();
  }

  clearMarcInput() {
    this.newrecord.marca = '';
    this.marcinput.nativeElement.focus();
  }

  private filterClients(value: string): WClient[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter(optionValue => optionValue.siglas.toLowerCase().includes(filterValue));
  }

  private filterDevices(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.devs.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filterMarcs(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.marcs.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredClientsOptions(value: string): Observable<WClient[]> {
    return of(value).pipe(
      map(filterString => this.filterClients(filterString)),
    );
  }

  getFilteredDevicesOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterDevices(filterString)),
    );
  }

  getFilteredMarcsOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterMarcs(filterString)),
    );
  }

  onClientSelectionChange($event) {
    this.filteredClients$ = this.getFilteredClientsOptions($event);
    // console.log($event);
    this.filteredClients$.subscribe((fclients: WClient[]) => {
      this.names = [];
      for (let i = 0; i < fclients.length; i++) {
        if (fclients[i].siglas === this.newrecord.cliente) {
          this.show_client_name = false;
          this.newrecord.cliente_nombre = '';
          this.entrega.id_cliente = fclients[i].id;
          this.workshopService.getWNames(fclients[i].id).subscribe((res: WPerson[]) => {
            this.names = res;
          });
          break;
        }
      }
    });
    this.deviceinput.nativeElement.focus();
  }

  onDeviceSelectionChange($event) {
    // this.filteredClients$ = this.getFilteredClientsOptions($event);
    // console.log($event);
    this.deviceChange();
    this.marcinput.nativeElement.focus();
  }

  onMarcSelectionChange($event) {
    // this.filteredClients$ = this.getFilteredClientsOptions($event);
    // console.log($event);
    this.marcChange();
  }

  removeClient(rclient: WClient) {
    Swal.fire({
      title: 'Confirma que desea eliminar el cliente "' + rclient.siglas + '"?',
      // tslint:disable-next-line: max-line-length
      text: 'Se eliminarán también los datos de las personas asociadas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.workshopService.deleteWClient(rclient.id).subscribe(res => {
          this.workshopService.getWClients().subscribe((clients: WClient[]) => {
            this.clients = clients;
            this.filteredClients$ = of(this.clients);
            this.newrecord.cliente = '';
            // this.clientChange();
          });
        });
      }
    });
  }

  removeDevice(wdev: string) {
    Swal.fire({
      title: 'Confirma que desea eliminar el dispositivo "' + wdev + '"?',
      // tslint:disable-next-line: max-line-length
      text: 'Se eliminarán también los datos asociados (marcas, modelos etc.).',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.workshopService.deleteWDevice(wdev).subscribe(res => {
          this.workshopService.getWDevices().subscribe((res2: WDevice[]) => {
            this.devs = [];
            for (let i = 0; i < res2.length; i++) {
              this.devs.push(res2[i].equipo);
            }
            this.filteredDevices$ = of(this.devs);
            this.newrecord.equipo = '';
          });
        });
      }
    });
  }

  clientChange() {
    this.filteredClients$ = this.getFilteredClientsOptions(this.newrecord.cliente);
    this.clientinput.nativeElement.focus();
    const regexp = new RegExp(/^[A-Z]{2,20}$/);
    if (regexp.test(this.newrecord.cliente)) {
      this.client_status = 'success';
    } else {
      this.client_status = 'danger';
    }
    this.show_client_name = true;
    this.filteredClients$.subscribe((fclients: WClient[]) => {
      this.names = [];
      for (let i = 0; i < fclients.length; i++) {
        if (fclients[i].siglas === this.newrecord.cliente) {
          this.show_client_name = false;
          this.newrecord.cliente_nombre = '';
          this.entrega.id_cliente = fclients[i].id;
          this.workshopService.getWNames(fclients[i].id).subscribe((res: WPerson[]) => {
            this.names = res;
          });
          break;
        }
      }
    });
  }

  clientNameChange() {
    const nameregexp = new RegExp(/^([A-Za-záéíóúñÑ]+\s?)+$/);
    if (nameregexp.test(this.newrecord.cliente_nombre)) {
      this.client_name_status = 'success';
    } else {
      this.client_name_status = 'danger';
    }
  }

  entregaCIChange() {
    const nameregexp = new RegExp(/^[0-9]{11}$/);
    if (nameregexp.test(this.entrega.ci)) {
      this.entrega_ci_status = 'success';
    } else {
      this.entrega_ci_status = 'danger';
    }
  }

  entregaCargoChange() {
    if (this.entrega.cargo) {
      this.entrega_cargo_status = 'success';
    } else {
      this.entrega_cargo_status = 'danger';
    }
  }

  deviceLostFocus() {
    if (this.newrecord.equipo) {
      this.marcs = [];
      this.workshopService.getWMarcs(this.newrecord.equipo).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.marcs.push(res[i].marca);
        }
        this.filteredMarcs$ = of(this.marcs);
      });
    }
  }

  deviceChange() {
    this.filteredMarcs$ = of([]);
    this.filteredDevices$ = this.getFilteredDevicesOptions(this.newrecord.equipo);
    const regexp = new RegExp(/^([A-ZÑa-záéíóúñ]+\s?)+$/);
    if (regexp.test(this.newrecord.equipo)) {
      this.device_status = 'success';
    } else {
      this.device_status = 'danger';
    }
  }

  marcLostFocus() {
    if (this.newrecord.equipo && this.newrecord.marca) {
      this.models = [];
      this.workshopService.getWModels(this.newrecord.equipo, this.newrecord.marca).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.models.push(res[i].modelo);
        }
      });
    }
  }

  marcChange() {
    this.filteredMarcs$ = this.getFilteredMarcsOptions(this.newrecord.marca);
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.marca)) {
      this.marc_status = 'success';
    } else {
      this.marc_status = 'danger';
    }
  }

  modelLostFocus() {
    if (this.newrecord.equipo && this.newrecord.marca && this.newrecord.modelo) {
      this.serials = [];
      this.inventaries = [];
      this.workshopService.getWSerials(this.newrecord.equipo, this.newrecord.marca, this.newrecord.modelo).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.serials.push(res[i].serie);
          this.inventaries.push(res[i].inventario);
        }
      });
    }
  }

  modelChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.modelo)) {
      this.model_status = 'success';
    } else {
      this.model_status = 'danger';
    }
  }

  invChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.inventario)) {
      this.inv_status = 'success';
    } else {
      this.inv_status = 'danger';
    }
  }

  serialChange() {
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.serie)) {
      this.serial_status = 'success';
    } else {
      this.serial_status = 'danger';
    }
  }

  nameChange() {
    if (!this.names.some(name => name.nombre === this.newrecord.entregado)) {
      this.showPersonInfo = true;
    } else {
      this.showPersonInfo = false;
    }
    const nameregexp = new RegExp(/^([A-Za-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.newrecord.entregado)) {
      this.deliver_status = 'success';
    } else {
      this.deliver_status = 'danger';
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
    if (this.client_status === 'danger' || this.newrecord.cliente === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un cliente válido.',
      } as SweetAlertOptions);
      this.client_status = 'danger';
      return false;
    } else if (this.show_client_name && (this.client_name_status === 'danger' || this.newrecord.cliente_nombre === '')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un nombre de cliente válido.',
      } as SweetAlertOptions);
      this.client_name_status = 'danger';
      return false;
    } else if (this.device_status === 'danger' || this.newrecord.equipo === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un equipo válido.',
      } as SweetAlertOptions);
      this.device_status = 'danger';
      return false;
    } else if (this.marc_status === 'danger' || this.newrecord.marca === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una marca válida.',
      } as SweetAlertOptions);
      this.marc_status = 'danger';
      return false;
    } else if (this.model_status === 'danger' || this.newrecord.modelo === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una modelo válido.',
      } as SweetAlertOptions);
      this.model_status = 'danger';
      return false;
    } else if (this.inv_status === 'danger' || this.newrecord.inventario === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de inventario válido.',
      } as SweetAlertOptions);
      this.inv_status = 'danger';
      return false;
    } else if (this.serial_status === 'danger' || this.newrecord.serie === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de serie válido.',
      } as SweetAlertOptions);
      this.serial_status = 'danger';
      return false;
    } else if (this.deliver_status === 'danger' || this.newrecord.entregado === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.deliver_status = 'danger';
      return false;
    } else if (this.showPersonInfo && (this.entrega_ci_status === 'danger' || !this.entrega.ci)) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el carnet de identidad de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.entrega_ci_status = 'danger';
      return false;
    } else if (this.showPersonInfo && (this.entrega_cargo_status === 'danger' || !this.entrega.cargo)) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el cargo de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.entrega_cargo_status = 'danger';
      return false;
    }
    return true;
  }

  save() {
    if (this.validate()) {
      // console.log(this.newrecord);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      if (this.showPersonInfo) {
        this.entrega.nombre = this.newrecord.entregado;
        this.workshopService.savePerson(this.entrega).subscribe(res => {});
      }
      this.workshopService.saveRecord(this.newrecord).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Registro guardado correctamente.',
        } as SweetAlertOptions);
        this.dialogRef.close(this.newrecord);
      });
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
