import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { WRecord } from '../../models/WRecord';
import { WorkshopService } from '../../services/workshop.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { WClient } from '../../models/WClient';
import { WDevice } from '../../models/WDevice';
import { Observable, of } from 'rxjs';
import { WPerson } from '../../models/WPerson';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'updt-wrecord',
  templateUrl: './updt-wrecord.component.html',
  styleUrls: ['./updt-wrecord.component.scss'],
})
export class UpdtWRecordComponent implements OnInit {

  @ViewChild('clinput', {static: false}) clientinput: ElementRef;
  @ViewChild('mrc', {static: false}) marcinput: ElementRef;
  @ViewChild('dev1', {static: false}) deviceinput1: ElementRef;
  @ViewChild('model', {static: false}) modelinput: ElementRef;
  @ViewChild('inv', {static: false}) invinput: ElementRef;
  @ViewChild('serie', {static: false}) serieinput: ElementRef;
  @ViewChild('cientrega', {static: false}) ciinput: ElementRef;
  @ViewChild('cirecoge', {static: false}) ci2input: ElementRef;
  @ViewChild('ot', {static: false}) otinput: ElementRef;
  @ViewChild('observ', {static: false}) obsinput: ElementRef;
  @ViewChild('fail', {static: false}) failinput: ElementRef;
  filteredClients$: Observable<WClient[]>;
  filteredDevices$: Observable<string[]>;
  filteredMarcs$: Observable<string[]>;
  filteredModels$: Observable<string[]>;
  filteredInvs$: Observable<string[]>;
  filteredSeries$: Observable<string[]>;
  filteredName$: Observable<WPerson[]>;
  filteredName2$: Observable<WPerson[]>;
  entrega: WPerson = {
    ci: '',
    nombre: '',
    cargo: '',
    id_cliente: -1,
  };
  recoge: WPerson = {
    ci: '',
    nombre: '',
    cargo: '',
    id_cliente: -1,
  };
  showPersonInfo: boolean = false;
  showPersonInfo2: boolean = false;
  wrecord: WRecord;
  state_status: string;
  clients: WClient[] = [];
  // devices: WDevice[] = [];
  devs: string[] = [];
  marcs: string[] = [];
  models: string[] = [];
  serials: string[] = [];
  inventaries: string[] = [];
  names: WPerson[] = [];
  ot_status: string = 'info';
  recoge_ci_status: string = 'info';
  status_description: string = '';
  client_status: string = 'info';
  client_name_status: string = 'info';
  device_status: string = 'info';
  marc_status: string = 'info';
  model_status: string = 'info';
  inv_status: string = 'info';
  serial_status: string = 'info';
  date_received_status: string = 'info';
  deliver_status: string = 'info';
  receiver_status: string = 'info';
  fallo_status: string = 'info';
  entrega_ci_status: string = 'info';
  entrega_cargo_status: string = 'info';
  recoge_cargo_status: string = 'info';
  show_client_name: boolean = false;
  save_lock = false;

  constructor(protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService, private authService: NbAuthService) { }

  ngOnInit() {
    this.updtDeviceStatus();
    this.wrecord.fecha_salida = new Date();
    this.workshopService.getWPerson(this.wrecord.entrega_ci).subscribe((ent: WPerson) => {
      this.entrega = ent;
      this.workshopService.getWPerson(this.wrecord.recoge_ci).subscribe((rec: WPerson) => {
        if (rec) {
          this.recoge = rec;
        }
        this.workshopService.getWNames(this.entrega.id_cliente).subscribe((res: WPerson[]) => {
          this.names = res;
          this.showPersonInfo = false;
          this.showPersonInfo2 = false;
          this.filteredName$ = of(this.names);
          this.filteredName2$ = of(this.names);
          if (!this.wrecord.ot) {
            setTimeout(() => this.otinput.nativeElement.focus(), 0);
          } else if (!this.recoge.ci) {
            setTimeout(() => this.ci2input.nativeElement.focus(), 0);
          } else {
            setTimeout(() => this.obsinput.nativeElement.focus(), 0);
          }
        });
      });
    });
    this.workshopService.getWDevices().subscribe((res: WDevice[]) => {
      for (let i = 0; i < res.length; i++) {
        this.devs.push(res[i].equipo);
      }
      this.filteredDevices$ = of(this.devs);
    });
    this.workshopService.getWMarcs(this.wrecord.equipo).subscribe((res: WDevice[]) => {
      for ( let i = 0; i < res.length; i++) {
        this.marcs.push(res[i].marca);
      }
      this.filteredMarcs$ = of(this.marcs);
    });
    this.workshopService.getWClients().subscribe((res: WClient[]) => {
      this.clients = res;
      this.filteredClients$ = of(this.clients);
    });
    this.workshopService.getWModels(this.wrecord.equipo, this.wrecord.marca).subscribe((res: WDevice[]) => {
      for ( let i = 0; i < res.length; i++) {
        this.models.push(res[i].modelo);
      }
      this.filteredModels$ = of(this.models);
    });
    this.workshopService.getWSerials(this.wrecord.equipo, this.wrecord.marca, this.wrecord.modelo).subscribe((res: WDevice[]) => {
      for ( let i = 0; i < res.length; i++) {
        this.serials.push(res[i].serie);
        this.inventaries.push(res[i].inventario);
      }
      this.filteredSeries$ = of(this.serials);
      this.filteredInvs$ = of(this.inventaries);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// NUEVO /////////////////////////////////////////////////////////////////
  clearClientInput() {
    this.wrecord.cliente = '';
    this.clientChange();
    setTimeout(() => this.clientinput.nativeElement.focus(), 0);
  }

  clearDeviceInput() {
    this.filteredMarcs$ = of([]);
    this.wrecord.equipo = '';
    this.deviceChange();
    setTimeout(() => this.deviceinput1.nativeElement.focus(), 0);
  }

  clearMarcInput() {
    this.filteredModels$ = of([]);
    this.wrecord.marca = '';
    this.marcChange();
    setTimeout(() => this.marcinput.nativeElement.focus(), 0);
  }

  clearModelInput() {
    this.filteredInvs$ = of([]);
    this.filteredSeries$ = of([]);
    this.wrecord.modelo = '';
    this.modelChange();
    setTimeout(() => this.modelinput.nativeElement.focus(), 0);
  }

  clearInvInput() {
    this.wrecord.inventario = '';
    this.invChange();
    setTimeout(() => this.invinput.nativeElement.focus(), 0);
  }

  clearSerieInput() {
    this.wrecord.serie = '';
    this.serialChange();
    setTimeout(() => this.serieinput.nativeElement.focus(), 0);
  }

  clearCIInput() {
    this.entrega.ci = '';
    this.entregaCIChange();
    setTimeout(() => this.ciinput.nativeElement.focus(), 0);
  }

  clearCI2Input() {
    this.recoge.ci = '';
    this.recoge.nombre = '';
    this.recoge.cargo = '';
    this.recogeCIChange();
    setTimeout(() => this.ci2input.nativeElement.focus(), 0);
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
      setTimeout(() => this.ciinput.nativeElement.focus(), 0);
    }
  }

  onCISelectionChange($event) {
    if ($event) {
      this.entregaCIChange();
      // setTimeout(() => this.modelinput.nativeElement.focus(), 0);
    }
  }

  onCI2SelectionChange($event) {
    if ($event) {
      this.recogeCIChange();
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
            this.wrecord.cliente = '';
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
            this.wrecord.equipo = '';
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
  ////////////////////////////////////////////////////////////////////////////////////////////////

  otChange() {
    const regexp = new RegExp(/^[0-9]{2,10}$/);
    if (regexp.test(this.wrecord.ot)) {
      this.ot_status = 'success';
    } else {
      this.ot_status = 'danger';
    }
  }

  updtDeviceStatus() {
    switch (this.wrecord.estado) {
      case 'P':
        this.state_status = 'info';
        this.status_description = 'El equipo aún no se diagnostica.';
        break;
      case 'R':
        this.state_status = 'success';
        this.status_description = 'El equipo está reparado.';
        break;
      case 'D':
        this.state_status = 'danger';
        this.status_description = 'El equipo no se pudo reparar.';
        break;
    }
  }

  clientChange() { // ACTUALIZADO
    // this.clientinput.nativeElement.focus();
    const regexp = new RegExp(/^[A-Z]{2,20}$/);
    if (regexp.test(this.wrecord.cliente)) {
      this.client_status = 'success';
    } else {
      this.client_status = 'danger';
    }
    if (this.filteredClients$) {
      this.filteredClients$.subscribe((fclients: WClient[]) => {
        this.names = [];
        // console.log(fclients);
        this.show_client_name = true;
        for (let i = 0; i < fclients.length; i++) {
          if (fclients[i].siglas === this.wrecord.cliente) {
            this.show_client_name = false;
            this.wrecord.cliente_nombre = '';
            this.entrega.id_cliente = fclients[i].id;
            this.workshopService.getWNames(fclients[i].id).subscribe((res: WPerson[]) => {
              this.names = res;
              this.filteredName$ = of(this.names);
            });
            break;
          }
        }
      });
    }
    this.filteredClients$ = this.getFilteredClientsOptions(this.wrecord.cliente);
  }

  entregaCIChange() { // NUEVO
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

  recogeCIChange() { // NUEVO
    this.filteredName2$ = this.getFilteredNamesOptions(this.recoge.ci);
    this.showPersonInfo2 = true;
    for (let i = 0; i < this.names.length; i++) {
      if (this.names[i].ci === this.recoge.ci) {
        this.recoge.nombre = this.names[i].nombre;
        this.recoge.cargo = this.names[i].cargo;
        this.showPersonInfo2 = false;
        break;
      } else {
        this.showPersonInfo2 = true;
      }
    }
    const nameregexp = new RegExp(/^[0-9]{11}$/);
    if (nameregexp.test(this.recoge.ci)) {
      this.recoge_ci_status = 'success';
    } else {
      this.recoge_ci_status = 'danger';
    }
  }

  entregaCargoChange() { // NUEVO
    if (this.entrega.cargo) {
      this.entrega_cargo_status = 'success';
    } else {
      this.entrega_cargo_status = 'danger';
    }
  }

  recogeCargoChange() { // NUEVO
    if (this.recoge.cargo) {
      this.recoge_cargo_status = 'success';
    } else {
      this.recoge_cargo_status = 'danger';
    }
  }

  clientNameChange() { // NUEVO
    const nameregexp = new RegExp(/^([A-Za-záéíóúñÑ]+\s?)+$/);
    if (nameregexp.test(this.wrecord.cliente_nombre)) {
      this.client_name_status = 'success';
    } else {
      this.client_name_status = 'danger';
    }
  }

  deviceLostFocus() { // ACTUALIZADO
    if (this.wrecord.equipo) {
      this.marcs = [];
      this.workshopService.getWMarcs(this.wrecord.equipo).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.marcs.push(res[i].marca);
        }
        this.filteredMarcs$ = of(this.marcs);
      });
    }
  }

  deviceChange() { // ACTUALIZADO
    this.filteredMarcs$ = of([]);
    this.filteredDevices$ = this.getFilteredDevicesOptions(this.wrecord.equipo);
    const regexp = new RegExp(/^([A-ZÑa-záéíóúñ]+\s?)+$/);
    if (regexp.test(this.wrecord.equipo)) {
      this.device_status = 'success';
    } else {
      this.device_status = 'danger';
    }
  }

  marcLostFocus() { // ACTUALIZADO
    if (this.wrecord.equipo && this.wrecord.marca) {
      this.models = [];
      this.workshopService.getWModels(this.wrecord.equipo, this.wrecord.marca).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.models.push(res[i].modelo);
        }
        this.filteredModels$ = of(this.models);
      });
    }
  }

  marcChange() { // ACTUALIZADO
    this.filteredModels$ = of([]);
    this.filteredMarcs$ = this.getFilteredMarcsOptions(this.wrecord.marca);
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.wrecord.marca)) {
      this.marc_status = 'success';
    } else {
      this.marc_status = 'danger';
    }
  }

  modelLostFocus() { // ACTUALIZADO
    if (this.wrecord.equipo && this.wrecord.marca && this.wrecord.modelo) {
      this.serials = [];
      this.inventaries = [];
      this.workshopService.getWSerials(this.wrecord.equipo, this.wrecord.marca, this.wrecord.modelo).subscribe((res: WDevice[]) => {
        for ( let i = 0; i < res.length; i++) {
          this.serials.push(res[i].serie);
          this.inventaries.push(res[i].inventario);
        }
        this.filteredInvs$ = of(this.inventaries);
        this.filteredSeries$ = of(this.serials);
      });
    }
  }

  modelChange() { // ACTUALIZADO
    this.filteredModels$ = this.getFilteredModelsOptions(this.wrecord.modelo);
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.wrecord.modelo)) {
      this.model_status = 'success';
    } else {
      this.model_status = 'danger';
    }
  }

  invChange() { // ACTUALIZADO
    this.filteredInvs$ = this.getFilteredInvsOptions(this.wrecord.inventario);
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.wrecord.inventario)) {
      this.inv_status = 'success';
    } else {
      this.inv_status = 'danger';
    }
  }

  serialChange() { // ACTUALIZADO
    this.filteredSeries$ = this.getFilteredSerialsOptions(this.wrecord.serie);
    const regexp = new RegExp(/^[a-zA-Z0-9-]{2,20}$/);
    if (regexp.test(this.wrecord.serie)) {
      this.serial_status = 'success';
    } else {
      this.serial_status = 'danger';
    }
  }

  failChange() {
    if (this.wrecord.fallo) {
      this.fallo_status = 'success';
    } else if (this.wrecord.estado !== 'P' && !this.wrecord.fallo) {
      this.fallo_status = 'danger';
    }
  }

  nameChange() { // ACTUALIZADO
    const nameregexp = new RegExp(/^([A-Za-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.entrega.nombre)) {
      this.deliver_status = 'success';
    } else {
      this.deliver_status = 'danger';
    }
  }

  name2Change() { // NUEVO
    const nameregexp = new RegExp(/^([A-Za-záéíóúñ]+\s?)+$/);
    if (nameregexp.test(this.recoge.nombre)) {
      this.receiver_status = 'success';
    } else {
      this.receiver_status = 'danger';
    }
  }

  extern_change(e: boolean) {
    this.wrecord.externo = e;
  }

  validate() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.client_status === 'danger' || this.wrecord.cliente === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un cliente válido.',
      } as SweetAlertOptions);
      this.client_status = 'danger';
      setTimeout(() => this.clientinput.nativeElement.focus(), 0);
      return false;
    } else if (this.show_client_name && (this.client_name_status === 'danger' || this.wrecord.cliente_nombre === '')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un nombre de cliente válido.',
      } as SweetAlertOptions);
      this.client_name_status = 'danger';
      return false;
    } else if (this.device_status === 'danger' || this.wrecord.equipo === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un equipo válido.',
      } as SweetAlertOptions);
      this.device_status = 'danger';
      setTimeout(() => this.deviceinput1.nativeElement.focus(), 0);
      return false;
    } else if (this.marc_status === 'danger' || this.wrecord.marca === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una marca válida.',
      } as SweetAlertOptions);
      this.marc_status = 'danger';
      setTimeout(() => this.marcinput.nativeElement.focus(), 0);
      return false;
    } else if (this.model_status === 'danger' || this.wrecord.modelo === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una modelo válido.',
      } as SweetAlertOptions);
      this.model_status = 'danger';
      setTimeout(() => this.modelinput.nativeElement.focus(), 0);
      return false;
    } else if (this.inv_status === 'danger' || this.wrecord.inventario === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de inventario válido.',
      } as SweetAlertOptions);
      this.inv_status = 'danger';
      setTimeout(() => this.invinput.nativeElement.focus(), 0);
      return false;
    } else if (this.serial_status === 'danger' || this.wrecord.serie === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir un número de serie válido.',
      } as SweetAlertOptions);
      this.serial_status = 'danger';
      setTimeout(() => this.serieinput.nativeElement.focus(), 0);
      return false;
    } else if (this.entrega_ci_status === 'danger' || this.entrega.ci === '') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el número de identidad de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.entrega_ci_status = 'danger';
      setTimeout(() => this.ciinput.nativeElement.focus(), 0);
      return false;
    } else if (this.showPersonInfo && (this.deliver_status === 'danger' || this.entrega.nombre === '')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.deliver_status = 'danger';
      return false;
    } else if (this.showPersonInfo && (this.entrega_cargo_status === 'danger' || this.entrega.cargo === '')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el cargo de la persona que entrega el equipo.',
      } as SweetAlertOptions);
      this.entrega_cargo_status = 'danger';
      return false;
    } else if (this.ot_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir una orden de trabajo válida.',
      } as SweetAlertOptions);
      this.ot_status = 'danger';
      setTimeout(() => this.otinput.nativeElement.focus(), 0);
      return false;
    } else if (this.fallo_status === 'danger' || (this.wrecord.fallo === '' && this.wrecord.estado !== 'P')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe describir el fallo que presentó el equipo.',
      } as SweetAlertOptions);
      this.fallo_status = 'danger';
      setTimeout(() => this.failinput.nativeElement.focus(), 0);
      return false;
    } else if (this.recoge_ci_status === 'danger') {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el número de identidad de la persona que recoge el equipo.',
      } as SweetAlertOptions);
      setTimeout(() => this.ci2input.nativeElement.focus(), 0);
      return false;
    } else if (this.showPersonInfo2 && (this.receiver_status === 'danger' || this.recoge.nombre === '')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el nombre de la persona que recoge el equipo.',
      } as SweetAlertOptions);
      this.receiver_status = 'danger';
      return false;
    } else if (this.showPersonInfo2 && (this.recoge_cargo_status === 'danger' || this.recoge.cargo === '')) {
      Toast.fire({
        icon: 'error',
        title: 'Debe escribir correctamente el cargo de la persona que recoge el equipo.',
      } as SweetAlertOptions);
      this.recoge_cargo_status = 'danger';
      return false;
    }
    return true;
  }

  save() {
    if (this.validate()) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      this.save_lock = true;
      this.wrecord.entregado = this.entrega.ci;
      this.wrecord.recogido = this.recoge.ci;
      if (this.showPersonInfo) { // PERSONA QUE ENTREGA NUEVA
        this.workshopService.getWPerson(this.entrega.ci).subscribe((ent: WPerson) => {
          if (ent) { // EXISTE
            Toast.fire({
              icon: 'error',
              title: 'Ya existe una persona registrada con el mismo número de identidad.',
            } as SweetAlertOptions);
            this.entrega_ci_status = 'danger';
            setTimeout(() => this.ciinput.nativeElement.focus(), 0);
            this.save_lock = false;
          } else {
            if (this.showPersonInfo2) { // PERSONA QUE RECOGE NUEVA
              this.workshopService.getWPerson(this.recoge.ci).subscribe((rec: WPerson) => {
                if (rec) { // EXISTE
                  Toast.fire({
                    icon: 'error',
                    title: 'Ya existe una persona registrada con el mismo número de identidad.',
                  } as SweetAlertOptions);
                  this.recoge_ci_status = 'danger';
                  setTimeout(() => this.ci2input.nativeElement.focus(), 0);
                  this.save_lock = false;
                } else { // GUARDO PERSONA QUE RECOGE Y ENTREGA Y DESPUES ACTUALIZO
                  if (this.recoge.ci !== this.entrega.ci) { // SI SON PERSONAS DISTINTAS
                    this.workshopService.savePerson(this.recoge, this.wrecord.cliente).subscribe(res2 => {
                      this.workshopService.savePerson(this.entrega, this.wrecord.cliente).subscribe(res3 => {
                        Toast.fire({
                          icon: 'success',
                          title: 'Registro guardado correctamente.',
                        } as SweetAlertOptions);
                        this.workshopService.updateRecord(this.wrecord.id, this.wrecord).subscribe(res => {
                          this.dialogRef.close(this.wrecord);
                        });
                      });
                    });
                  } else { // SI ES LA MISMA PERSONA SOLO LA GUARDO UNA VEZ
                    this.workshopService.savePerson(this.entrega, this.wrecord.cliente).subscribe(res3 => {
                      Toast.fire({
                        icon: 'success',
                        title: 'Registro guardado correctamente.',
                      } as SweetAlertOptions);
                      this.workshopService.updateRecord(this.wrecord.id, this.wrecord).subscribe(res => {
                        this.dialogRef.close(this.wrecord);
                      });
                    });
                  }
                }
              });
            } else { // GUARDO PESONA NUEVA QUE ENTREGA Y ACTUALIZO
              this.workshopService.savePerson(this.entrega, this.wrecord.cliente).subscribe(res3 => {
                Toast.fire({
                  icon: 'success',
                  title: 'Registro guardado correctamente.',
                } as SweetAlertOptions);
                this.workshopService.updateRecord(this.wrecord.id, this.wrecord).subscribe(res => {
                  this.dialogRef.close(this.wrecord);
                });
              });
            }
          }
        });
      } else if (this.showPersonInfo2) { // PERSONA QUE RECOGE NUEVA
        this.workshopService.getWPerson(this.recoge.ci).subscribe((rec: WPerson) => {
          if (rec) { // EXISTE
            Toast.fire({
              icon: 'error',
              title: 'Ya existe una persona registrada con el mismo número de identidad.',
            } as SweetAlertOptions);
            this.recoge_ci_status = 'danger';
            setTimeout(() => this.ci2input.nativeElement.focus(), 0);
            this.save_lock = false;
          } else { // GUARDO PERSONA QUE RECOGE Y DESPUES ACTUALIZO
            this.workshopService.savePerson(this.recoge, this.wrecord.cliente).subscribe(res2 => {
              Toast.fire({
                icon: 'success',
                title: 'Registro guardado correctamente.',
              } as SweetAlertOptions);
              this.workshopService.updateRecord(this.wrecord.id, this.wrecord).subscribe(res => {
                this.dialogRef.close(this.wrecord);
              });
            });
          }
        });
      } else {
        Toast.fire({
          icon: 'success',
          title: 'Registro guardado correctamente.',
        } as SweetAlertOptions);
        this.workshopService.updateRecord(this.wrecord.id, this.wrecord).subscribe(res => {
          this.dialogRef.close(this.wrecord);
        });
      }
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
