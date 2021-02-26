import { Component, OnInit } from '@angular/core';
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
import {HttpClient} from '@angular/common/http';
import * as fsaver from 'file-saver';
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

  constructor(private comercialService: ComercialService, private http: HttpClient, private dialogService: NbDialogService,
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

}
