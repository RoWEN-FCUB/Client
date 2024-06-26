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

  @ViewChild('clinput', {static: false}) clientinput: ElementRef;
  @ViewChild('mrc', {static: false}) marcinput: ElementRef;
  @ViewChild('dev1', {static: false}) deviceinput1: ElementRef;
  @ViewChild('model', {static: false}) modelinput: ElementRef;
  @ViewChild('inv', {static: false}) invinput: ElementRef;
  @ViewChild('serie', {static: false}) serieinput: ElementRef;
  @ViewChild('namep', {static: false}) nameinput: ElementRef;
  filteredClients$: Observable<WClient[]>;
  filteredDevices$: Observable<string[]>;
  filteredMarcs$: Observable<string[]>;
  filteredModels$: Observable<string[]>;
  filteredInvs$: Observable<string[]>;
  filteredSeries$: Observable<string[]>;
  filteredName$: Observable<WPerson[]>;
  clients: WClient[] = [];
  // devices: WDevice[] = [];
  devs: string[] = [];
  marcs: string[] = [];
  models: string[] = [];
  serials: string[] = [];
  inventaries: string[] = [];
  names: WPerson[] = [];
  newrecord: WRecord = {
    cod: 0,
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
    id_serv: 0,
    fallo: '',
    observaciones: '',
    externo: false,
  };
  entrega: WPerson = {
    nombre: '',
    ci: '',
    cargo: '',
    id_cliente: -1,
  };
  showPersonInfo: boolean = false;
  client_status: string = 'info';
  cod_status: string = 'info';
  client_name_status: string = 'info';
  device_status: string = 'info';
  marc_status: string = 'info';
  model_status: string = 'info';
  inv_status: string = 'info';
  serial_status: string = 'info';
  date_received_status: string = 'info';
  deliver_status: string = 'info';
  entrega_ci_status: string = 'info';
  entrega_cargo_status: string = 'info';
  // tslint:disable-next-line: max-line-length
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_sup: 0, id_emp: 0, id_serv: 0};
  show_client_name: boolean = false;
  save_lock = false;
  last_code: number = 0;
  // tslint:disable-next-line: max-line-length
  constructor(private library: FaIconLibrary, protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService, private authService: NbAuthService) {
    this.library.addIcons(faTrashAlt);
   }

  ngOnInit() {
    setTimeout(() => this.clientinput.nativeElement.focus(), 0);
    this.workshopService.getWClients().subscribe((res: WClient[]) => {
      this.clients = res;
      this.filteredClients$ = of(this.clients);
      this.workshopService.getWDevices().subscribe((res2: WDevice[]) => {
        for (let i = 0; i < res2.length; i++) {
          this.devs.push(res2[i].equipo);
        }
        this.filteredDevices$ = of(this.devs);
      });
    });
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.newrecord.id_serv = this.user.id_serv;
      this.newrecord.especialista = this.user.fullname;
      this.newrecord.id_superior = this.user.id_sup;
    });
  }

  clearClientInput() {
    this.newrecord.cliente = '';
    this.clientChange();
    setTimeout(() => this.clientinput.nativeElement.focus(), 0);
  }

  clearDeviceInput() {
    this.filteredMarcs$ = of([]);
    this.newrecord.equipo = '';
    this.deviceChange();
    setTimeout(() => this.deviceinput1.nativeElement.focus(), 0);
  }

  clearMarcInput() {
    this.filteredModels$ = of([]);
    this.newrecord.marca = '';
    this.marcChange();
    setTimeout(() => this.marcinput.nativeElement.focus(), 0);
  }

  clearModelInput() {
    this.filteredInvs$ = of([]);
    this.filteredSeries$ = of([]);
    this.newrecord.modelo = '';
    this.modelChange();
    setTimeout(() => this.modelinput.nativeElement.focus(), 0);
  }

  clearInvInput() {
    this.newrecord.inventario = '';
    this.invChange();
    setTimeout(() => this.invinput.nativeElement.focus(), 0);
  }

  clearSerieInput() {
    this.newrecord.serie = '';
    this.serialChange();
    setTimeout(() => this.serieinput.nativeElement.focus(), 0);
  }

  clearNameInput() {
    this.newrecord.entregado = '';
    this.entrega.ci = '';
    this.entrega.cargo = '';
    this.entrega.nombre = '';
    this.deliver_status = 'danger';
    this.entrega_ci_status = 'danger';
    this.entrega_cargo_status = 'danger';
    this.nameChange();
    setTimeout(() => this.nameinput.nativeElement.focus(), 0);
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

  private filterModels(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.models.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filterInvs(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.inventaries.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filterSeries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.serials.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filterNames(value: string): WPerson[] {
    const filterValue = value.toLowerCase();
    return this.names.filter(optionValue => optionValue.ci.toLowerCase().includes(filterValue));
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

  getFilteredModelsOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterModels(filterString)),
    );
  }

  getFilteredInvsOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterInvs(filterString)),
    );
  }

  getFilteredSerialsOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterSeries(filterString)),
    );
  }

  getFilteredNamesOptions(value: string): Observable<WPerson[]> {
    return of(value).pipe(
      map(filterString => this.filterNames(filterString)),
    );
  }

  onClientSelectionChange($event) {
    if ($event) {
      this.clientChange();
      setTimeout(() => this.deviceinput1.nativeElement.focus(), 0);
    }
  }

  onDeviceSelectionChange($event) {
    if ($event) {
      this.deviceChange();
      setTimeout(() => this.marcinput.nativeElement.focus(), 0);
    }
  }

  onMarcSelectionChange($event) {
    if ($event) {
      this.marcChange();
      setTimeout(() => this.modelinput.nativeElement.focus(), 0);
    }
  }

  onModelSelectionChange($event) {
    if ($event) {
      this.modelChange();
      setTimeout(() => this.invinput.nativeElement.focus(), 0);
    }
  }

  onInvSelectionChange($event) {
    if ($event) {
      this.invChange();
      setTimeout(() => this.serieinput.nativeElement.focus(), 0);
    }
  }

  onSerieSelectionChange($event) {
    if ($event) {
      this.serialChange();
      setTimeout(() => this.nameinput.nativeElement.focus(), 0);
    }
  }

  onNameSelectionChange($event) {
    if ($event) {
      this.entregaCIChange();
      // setTimeout(() => this.modelinput.nativeElement.focus(), 0);
    }
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
            this.newrecord.cliente = '';
            this.filteredClients$ = of(this.clients);
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

  removeWPerson(wper: WPerson) {
    Swal.fire({
      title: 'Confirma que desea eliminar del registro a "' + wper.nombre + '"?',
      // tslint:disable-next-line: max-line-length
      text: 'Se eliminará su nombre del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.workshopService.deleteWPerson(wper.id).subscribe(resp => {
          this.workshopService.getWNames(this.entrega.id_cliente).subscribe((res: WPerson[]) => {
            this.names = res;
            this.filteredName$ = of(this.names);
          });
        });
      }
    });
  }

  clientChange() {
    // this.clientinput.nativeElement.focus();
    const regexp = new RegExp(/^[A-Z]{2,20}$/);
    if (regexp.test(this.newrecord.cliente)) {
      this.client_status = 'success';
    } else {
      this.client_status = 'danger';
    }
    this.filteredClients$.subscribe((fclients: WClient[]) => {
      this.names = [];
      // console.log(fclients);
      this.show_client_name = true;
      for (let i = 0; i < fclients.length; i++) {
        if (fclients[i].siglas === this.newrecord.cliente) {
          this.show_client_name = false;
          this.newrecord.cliente_nombre = '';
          this.entrega.id_cliente = fclients[i].id;
          this.workshopService.getWNames(fclients[i].id).subscribe((res: WPerson[]) => {
            this.names = res;
            this.filteredName$ = of(this.names);
          });
          break;
        }
      }
    });
    this.filteredClients$ = this.getFilteredClientsOptions(this.newrecord.cliente);
  }

  clientNameChange() {
    if (this.newrecord.cliente_nombre) {
      this.client_name_status = 'success';
    } else {
      this.client_name_status = 'danger';
    }
  }

  entregaCIChange() {
    this.filteredName$ = this.getFilteredNamesOptions(this.entrega.ci);
    this.showPersonInfo = true;
    for (let i = 0; i < this.names.length; i++) {
      if (this.names[i].ci === this.entrega.ci) {
        this.entrega.nombre = this.names[i].nombre;
        this.entrega.cargo = this.names[i].cargo;
        this.showPersonInfo = false;
        break;
      } else {
        this.showPersonInfo = true;
      }
    }
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
        this.filteredModels$ = of(this.models);
      });
    }
  }

  marcChange() {
    this.filteredModels$ = of([]);
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
        this.filteredInvs$ = of(this.inventaries);
        this.filteredSeries$ = of(this.serials);
      });
    }
  }

  modelChange() {
    this.filteredModels$ = this.getFilteredModelsOptions(this.newrecord.modelo);
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.modelo)) {
      this.model_status = 'success';
    } else {
      this.model_status = 'danger';
    }
  }

  invChange() {
    this.filteredInvs$ = this.getFilteredInvsOptions(this.newrecord.inventario);
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.inventario)) {
      this.inv_status = 'success';
    } else {
      this.inv_status = 'danger';
    }
  }

  serialChange() {
    this.filteredSeries$ = this.getFilteredSerialsOptions(this.newrecord.serie);
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.newrecord.serie)) {
      this.serial_status = 'success';
    } else {
      this.serial_status = 'danger';
    }
  }

  nameChange() {
    const nameregexp = new RegExp(/^([A-Za-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.entrega.nombre)) {
      this.deliver_status = 'success';
    } else {
      this.deliver_status = 'danger';
    }
  }

  extern_change(e: boolean) {
    this.newrecord.externo = e;
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
    } else if ((this.entrega_ci_status === 'danger' || !this.entrega.ci) && !this.newrecord.externo) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el carnet de identidad de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.entrega_ci_status = 'danger';
      return false;
    } else if (this.showPersonInfo && (this.deliver_status === 'danger' || this.entrega.nombre === '') && !this.newrecord.externo) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.deliver_status = 'danger';
      return false;
    } else if (this.showPersonInfo && (this.entrega_cargo_status === 'danger' || !this.entrega.cargo) && !this.newrecord.externo) {
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
      this.save_lock = true;
      // console.log(this.newrecord);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      this.newrecord.entregado = this.entrega.ci;
      if (this.newrecord.externo) {
        this.newrecord.cod = -1;
      } else {
        this.newrecord.cod = this.last_code;
      }
      if (this.showPersonInfo) { // PERSONA NUEVA
        this.workshopService.getWPerson(this.entrega.ci).subscribe((per: WPerson) => {
          if (per) { // EXISTE EN LA BD
            Toast.fire({
              icon: 'error',
              title: 'Ya existe una persona registrada con el mismo número de identidad.',
            } as SweetAlertOptions);
            this.save_lock = false;
          } else { // GUARDAR NUEVA PERSONA Y REGISTRO
            this.workshopService.saveRecord(this.newrecord).subscribe(res => {
              this.workshopService.savePerson(this.entrega, this.newrecord.cliente).subscribe(res2 => {
                Toast.fire({
                  icon: 'success',
                  title: 'Registro guardado correctamente.',
                } as SweetAlertOptions);
                this.dialogRef.close(this.newrecord);
              });
              this.dialogRef.close(this.newrecord);
            });
          }
        });
      } else { // GUARDAR SOLO REGISTRO
        this.workshopService.saveRecord(this.newrecord).subscribe(res => {
            this.dialogRef.close(this.newrecord);
        });
      }
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
