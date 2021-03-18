import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CProvider } from '../../models/CProvider';
import { CProduct } from '../../models/CProduct';
import { CReceipt } from '../../models/CReceipt';
import { ComercialService } from '../../services/comercial.service';
import { NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import 'moment/min/locales';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import Swal, { SweetAlertOptions } from 'sweetalert2';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { OwlDateTimeComponent /*, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE*/ } from '@danielmoncada/angular-datetime-picker';
import { Moment } from 'moment';
import * as fsaver from 'file-saver';
import { NewCproductComponent } from '../new-cproduct/new-cproduct.component';
import { Workbook } from 'exceljs';
import { HttpClient } from '@angular/common/http';
import ipserver from '../../ipserver';
import { NewCproviderComponent } from '../new-cprovider/new-cprovider.component';
import { NewCreceiptComponent } from '../new-creceipt/new-creceipt.component';
import { Company } from '../../models/Company';
import { CompanyService } from '../../services/company.service';
import { EService } from '../../models/EService';
import { EserviceService } from '../../services/eservice.service';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css'],
})
export class ComercialComponent implements OnInit {

  proveedores: CProvider[] = [];
  productos: CProduct[] = [];
  company: Company = {};
  service: EService = {};
  vales: CReceipt[] = [];
  config: any;
  selected_provider: number = 0;
  show_delivered_receipts: number = 3;
  show_concilied_receipts: number = 3;
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_emp: 0, id_serv: 0};
  search_status: string = 'info';
  search_string: string = '';
  @ViewChild('strsearch', {static: false}) searchinput: ElementRef;
  filename: string = '';
  conc: {
    codped: string,
    fecha: string,
    provincia: string,
    estado_entrega: string,
    transportista: string,
    proveedor: string,
  }[] = [];

  constructor(private http: HttpClient, private comercialService: ComercialService, private dialogService: NbDialogService,
    private authService: NbAuthService, private companyService: CompanyService, private eserviceService: EserviceService) {
      this.config = {
        itemsPerPage: 2,
        currentPage: 1,
        totalItems: 0,
      };
     }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.eserviceService.getOne(this.user.id_serv).subscribe((serv: EService) => {
        this.service = serv;
      });
      this.companyService.getOne(this.user.id_emp).subscribe((comp: Company) => {
        this.company = comp;
      });
      this.comercialService.getProviders(this.user.id_serv).subscribe((prov: CProvider[]) => {
        this.proveedores = prov;
        if (this.proveedores.length > 0) {
          this.comercialService.getProducts(this.proveedores[0].id).subscribe((prod: CProduct[]) => {
            this.productos = prod;
          });
          this.loadReceipts();
        }
      });
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.search();
  }

  loadReceipts() {
    let strtosearch = 'null';
    if (this.search_string !== '') {
      strtosearch = this.search_string;
    }
    this.vales = [];
    // tslint:disable-next-line: max-line-length
    this.comercialService.searchReceipts(strtosearch, this.config.currentPage, this.proveedores[this.selected_provider].id, this.show_concilied_receipts, this.show_delivered_receipts).subscribe((resp: {receipts: any[], total: number}) => {
      // console.log(resp);
      this.config.totalItems = resp.total;
      this.vales = resp.receipts;
    });
  }

  provider_change() {
    if (this.proveedores.length > 0) {
      this.comercialService.getProducts(this.proveedores[this.selected_provider].id).subscribe((prod: CProduct[]) => {
        this.productos = prod;
      });
      this.search();
    }
  }

  concilied_change() {
    this.search();
  }

  delivered_change() {
    this.search();
  }

  tabChanged(e) {
    // console.log(e);
  }

  search() {
    this.loadReceipts();
  }

  clearSearchInput() {
    this.search_string = '';
    setTimeout(() => this.searchinput.nativeElement.focus(), 0);
    this.search();
  }

  openNewCProduct() {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewCproductComponent, {context: {proovedor_seleccionado: this.proveedores[this.selected_provider].id}}).onClose.subscribe(
      (newCProduct) => {
        if (newCProduct) {
          this.comercialService.getProducts(this.proveedores[this.selected_provider].id).subscribe((prod: CProduct[]) => {
            this.productos = prod;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 3000,
            });
            Toast.fire({
              icon: 'success',
              title: 'Producto creado correctamente.',
            } as SweetAlertOptions);
          });
        }
      },
    );
  }

  openNewCProvider() {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewCproviderComponent, {context: {id_serv: this.user.id_serv}}).onClose.subscribe(
      (newCProvider) => {
        if (newCProvider) {
          this.comercialService.getProviders(this.user.id_serv).subscribe((prov: CProvider[]) => {
            this.proveedores = prov;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 3000,
            });
            Toast.fire({
              icon: 'success',
              title: 'Proveedor creado correctamente.',
            } as SweetAlertOptions);
          });
        }
      },
    );
  }

  openNewCReceipt() {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewCreceiptComponent, {context: {proveedor: this.proveedores[this.selected_provider], productos: this.productos}}).onClose.subscribe(
      (newCProduct) => {
        if (newCProduct) {
          this.loadReceipts();
        }
      },
    );
  }

  openEditCProvider(index: number) {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewCproviderComponent, {context: {id_serv: this.user.id_serv, newProvider: this.proveedores[index]}}).onClose.subscribe(
      (newCProvider) => {
        if (newCProvider) {
          this.comercialService.getProviders(this.user.id_serv).subscribe((prov: CProvider[]) => {
            this.proveedores = prov;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 3000,
            });
            Toast.fire({
              icon: 'success',
              title: 'Proveedor actualizado correctamente.',
            } as SweetAlertOptions);
          });
        }
      },
    );
  }

  openEditProduct(index: number) {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewCproductComponent, {context: {newCProduct: this.productos[index], proovedor_seleccionado: this.proveedores[this.selected_provider].id}}).onClose.subscribe(
      (newCProduct) => {
        if (newCProduct) {
          this.comercialService.getProducts(this.proveedores[this.selected_provider].id).subscribe((prod: CProduct[]) => {
            this.productos = prod;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 3000,
            });
            Toast.fire({
              icon: 'success',
              title: 'Producto actualizado correctamente.',
            } as SweetAlertOptions);
          });
        }
      },
    );
  }

  openEditCReceipt(i: number, editable: boolean) {
    let title: string;
    if (editable) {
      title = 'Datos del vale ' + this.vales[i].pedido;
    } else {
      title = 'Modificar vale ' + this.vales[i].pedido;
    }
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewCreceiptComponent, {context: {title: title, editable: editable, newReceipt: JSON.parse(JSON.stringify(this.vales[i])), productos: this.productos}}).onClose.subscribe(
      (newCProduct) => {
        if (newCProduct) {
          this.loadReceipts();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Vale actualizado correctamente.',
          } as SweetAlertOptions);
        }
      },
    );
  }

  deleteProduct(index: number) {
    Swal.fire({
      title: 'Confirma que desea eliminar el producto "' + this.productos[index].nombre + '"?',
      text: 'Se eliminarán todos sus datos del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      if (result.value) {
        this.comercialService.deleteProduct(this.productos[index].id).subscribe((res: {text: string}) => {
          if (res.text === 'Product exists') {
            Toast.fire({
              icon: 'error',
              title: 'El producto forma parte de vales y no se puede eliminar.',
            } as SweetAlertOptions);
          } else if (res.text === 'Product deleted') {
            this.comercialService.getProducts(this.proveedores[this.selected_provider].id).subscribe((prod: CProduct[]) => {
              this.productos = prod;
              Toast.fire({
                icon: 'success',
                title: 'Producto eliminado correctamente.',
              } as SweetAlertOptions);
            });
          }
        });
      }
    });
  }

  deleteProvider(index: number) {
    Swal.fire({
      title: 'Confirma que desea eliminar el proveedor "' + this.proveedores[index].nombre + '"?',
      text: 'Se eliminarán todos sus datos del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      if (result.value) {
        this.comercialService.deleteProvider(this.proveedores[index].id).subscribe((res: {text: string}) => {
          if (res.text === 'Provider exists') {
            Toast.fire({
              icon: 'error',
              title: 'El proveedor forma parte de vales y no se puede eliminar.',
            } as SweetAlertOptions);
          } else if (res.text === 'Provider deleted') {
            this.comercialService.getProviders(this.user.id_emp).subscribe((prov: CProvider[]) => {
              this.proveedores = prov;
              Toast.fire({
                icon: 'success',
                title: 'Proveedor eliminado correctamente.',
              } as SweetAlertOptions);
            });
          }
        });
      }
    });
  }

  deleteReceipt(index: number) {
    Swal.fire({
      title: 'Confirma que desea eliminar el vale "' + this.vales[index].pedido + '"?',
      text: 'Se eliminarán todos sus datos del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      if (result.value) {
        this.comercialService.deleteReceipt(this.vales[index].id).subscribe((res: {text: string}) => {
          this.loadReceipts();
          Toast.fire({
            icon: 'success',
            title: 'Vale eliminado correctamente.',
          } as SweetAlertOptions);
        });
      }
    });
  }

  changeDeliveredState(index: number, state: boolean) {
    let msg: string = '- No entregado -';
    if (state) {
      msg = '- Entregado -';
    }
    Swal.fire({
      title: 'Confirma que desea cambiar el estado del vale "' + this.vales[index].pedido + '"?',
      text: 'Se establecerá a ' + msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      if (result.value) {
        this.vales[index].entregado = state;
        this.comercialService.updateReceipt(this.vales[index], this.vales[index].id).subscribe((res: {text: string}) => {
          this.loadReceipts();
          Toast.fire({
            icon: 'success',
            title: 'Vale actualizado correctamente.',
          } as SweetAlertOptions);
        });
      }
    });
  }

  markForConciliate(e, index: number) {
    // console.log(this.vales[index].id + ' ' + e);
    this.vales[index].marcado_conciliar = e;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    let msg: string = 'desmarcado';
    if (e) {
      msg = 'marcado';
    }
    this.comercialService.updateReceipt(this.vales[index], this.vales[index].id).subscribe((res: {text: string}) => {
      this.loadReceipts();
      Toast.fire({
        icon: 'success',
        title: 'Vale ' + msg + ' para conciliar correctamente.',
      } as SweetAlertOptions);
    });
  }

  preview(files) {
    if (files.length === 0)
      return;
    const formData = new FormData();
    formData.append('uploads', files[0], files[0].filename);
    // console.log(formData.get('uploads'));
    this.comercialService.uploadFile(formData).subscribe(
      (res: {fname: string}) => {
        this.filename = res.fname;
        // console.log(this.filename);
      },
    );
  }

  async procesar_fichero() {
    const workBook: Workbook = new Workbook();
    const fdir = ipserver + 'public/' + this.filename; // + 'public/YVFMFrd9OgaAxgLci1fkiXge.xlsx';  //
    const rconc: {
      codped: string,
      fecha: string,
      provincia: string,
      estado_entrega: string,
      transportista: string,
      proveedor: string,
    }[] = [];
    const subscription = this.http.get(fdir, { responseType: 'blob' })
    .subscribe(value => {
      const blob: Blob = value;
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const contents = e.target.result;
        workBook.xlsx.load(contents).then(data => {
          const codped = workBook.worksheets[0].getRow(4).getCell(2).toString();
          // console.log(codped);
          let i = 4;
          do {
            rconc.push(
              {
                codped: workBook.worksheets[0].getRow(i).getCell(2).toString(),
                fecha: moment.utc(new Date(workBook.worksheets[0].getRow(i).getCell(3).text)).format('DD/MM/YYYY'),
                provincia: workBook.worksheets[0].getRow(i).getCell(4).toString(),
                estado_entrega: workBook.worksheets[0].getRow(i).getCell(5).toString(),
                transportista: workBook.worksheets[0].getRow(i).getCell(6).toString(),
                proveedor: workBook.worksheets[0].getRow(i).getCell(7).toString(),
              },
            );
            i++;
          } while (workBook.worksheets[0].getRow(i).getCell(2).toString() !== '');
          i = 1;
          do {
            const prod2 = workBook.worksheets[1].getRow(i).getCell(1).toString();
            for (let j = 0; j < rconc.length; j++) {
              if (rconc[j].codped.indexOf(prod2, 0) !== -1) {
                rconc[j].estado_entrega = 'Entregado';
                workBook.worksheets[0].getRow(j + 4).getCell(5).value = 'Entregado';
                break;
              }
            }
            i++;
          } while (workBook.worksheets[1].getRow(i).getCell(1).toString() !== '');
          workBook.xlsx.writeBuffer().then(data1 => {
            const blobUpdate = new Blob([data1], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            // tslint:disable-next-line: max-line-length
            fsaver.saveAs(blobUpdate, 'Conciliación ' + moment.utc().format('DD-MM-YYYY') + '.xlsx');
          });
        });
      };
      reader.readAsArrayBuffer(blob);
    });
    this.conc = rconc;
    // console.log(this.conc);
  }
}
