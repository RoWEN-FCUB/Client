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
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css'],
})
export class ComercialComponent implements OnInit {

  proveedores: CProvider[] = [];
  productos: CProduct[] = [];
  vales: CReceipt[] = [];
  selected_provider: number = 0;
  show_delivered_receipts: number = 0;
  show_concilied_receipts: number = 0;
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_emp: 0};
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
    private authService: NbAuthService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.comercialService.getProviders(this.user.id_emp).subscribe((prov: CProvider[]) => {
        this.proveedores = prov;
        if (this.proveedores.length > 0) {
          this.comercialService.getProducts(this.proveedores[0].id).subscribe((prod: CProduct[]) => {
            this.productos = prod;
          });
          // tslint:disable-next-line: max-line-length
          this.comercialService.getReceipts(this.proveedores[0].id, this.show_concilied_receipts, this.show_delivered_receipts).subscribe((res: any[]) => {
            // console.log(res);
            let oldid = null;
            let newreceipt: CReceipt;
            for (let i = 0; i < res.length; i++) {
              const newproduct: CProduct = {
                id: (res[i].id_producto as number),
                cantidad: (res[i].cantidad as number),
                codigo: (res[i].codigo as string),
                nombre: (res[i].nombre as string),
                descripcion: (res[i].descripcion as string),
                unidad_medida: (res[i].unidad_medida as string),
                precio: (res[i].precio as number),
                mlc: (res[i].mlc as boolean),
              };
              if ((res[i].id as number) !== oldid) {
                oldid = res[i].id as number;
                newreceipt = {
                  id: (res[i].id as number),
                  pedido: (res[i].pedido as string),
                  precio_total: (res[i].precio_total as number),
                  comprador: (res[i].comprador as string),
                  destinatario: (res[i].destinatario as string),
                  destinatario_direccion: (res[i].destinatario_direccion as string),
                  destinatario_telefono: (res[i].destinatario_telefono as string),
                  conciliado: (res[i].conciliado as boolean),
                  marcado_conciliar: (res[i].marcado_conciliar as boolean),
                  entregado: (res[i].entregado as boolean),
                  fecha_emision: (res[i].fecha_emision as Date),
                  productos: [],
                  consto_envio: (res[i].costo_envio as number),
                  provincia: (res[i].provincia as string),
                  municipio: (res[i].municipio as string),
                };
                newreceipt.productos.push(newproduct);
                this.vales.push(newreceipt);
              } else {
                this.vales[i - 1].productos.push(newproduct);
              }
            }
            // console.log(this.vales);
          });
        }
      });
    });
  }

  provider_change() {
    if (this.proveedores.length > 0) {
      this.comercialService.getProducts(this.proveedores[this.selected_provider].id).subscribe((prod: CProduct[]) => {
        this.productos = prod;
      });
    }
  }

  concilied_change(e) {

  }

  delivered_change(e) {

  }

  tabChanged(e) {
    // console.log(e);
  }

  search() {

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
          // this.search();
        }
      },
    );
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
