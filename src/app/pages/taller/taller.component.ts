import {
  Component, OnInit,
} from '@angular/core';
import { WorkshopService } from '../../services/workshop.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { WRecord } from '../../models/WRecord';
import { WPart } from '../../models/WPart';
import { NbDialogService } from '@nebular/theme';
import 'moment/min/locales';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { NewWRecordComponent } from '../new-wrecord/new-wrecord.component';
import { UpdtWRecordComponent } from '../updt-wrecord/updt-wrecord.component';
import { WpartsComponent } from '../wparts/wparts.component';
import { User } from '../../models/User';
import { Company } from '../../models/Company';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFilePdf, faTrashAlt, faFileAlt, faShareSquare, faIdCard, faListAlt } from '@fortawesome/free-regular-svg-icons';

import { image1, image2 } from './base64images';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.scss'],
})
export class TallerComponent implements OnInit {

  wrecords: WRecord[] = [];
  search_status: string = 'info';
  search_string: string = '';
  config: any;
  table_to_print = [];
  docDefinition = {};
  company: Company = {};
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_emp: 0};
  constructor(private userService: UserService,
    private workshopService: WorkshopService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private library: FaIconLibrary,
    ) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
    };
    this.library.addIcons(faFilePdf, faTrashAlt, faFileAlt, faShareSquare, faIdCard, faListAlt);
    }

  ngOnInit() {
    const usr = this.authService.getToken().subscribe((res: NbAuthJWTToken) => {
      this.user = res.getPayload();
      this.search();
      this.companyService.getOne(this.user.id_emp).subscribe((comp: Company) => {
        this.company = comp;
      });
    });
  }

  generateTableToPrint() {
    this.table_to_print = [];
    const usrtoprint = this.user;
    this.userService.getSup(this.user.id).subscribe((res: User) => {
      usrtoprint.supname = res.fullname;
      usrtoprint.supposition = res.position;
      this.docDefinition = {
        info: {
          title: 'Registro de taller',
        },
        footer: function(currentPage, pageCount) {
          return {
            text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
            alignment: 'right',
            margin: [2, 2, 5, 2],
            fontSize: 10,
          };
        },
        pageSize: 'LETTER',
        pageOrientation: 'landscape',
        content: [
          {
            columns: [
              {
                image: image1,
                width: 168,
                height: 60,
              },
              [
                {
                  columns: [
                    {text: 'Registro de taller de:', fontSize: 15, width: 'auto'},
                    {text: this.user.fullname, fontSize: 15, width: 'auto', style: {bold: true}, decoration: 'underline'},
                  ],
                  columnGap: 10,
                },
                {
                  columns: [
                    {text: 'Cargo:', fontSize: 15, width: 'auto'},
                    {text: this.user.position, fontSize: 15, width: 'auto', style: {bold: true}, decoration: 'underline'},
                  ],
                  columnGap: 10,
                },
              ],
            ],
          },
          {
            /*table: {
              widths: ['*', '*', '*', '*', '*', 60, 60],
              body: this.table_to_print,
            },
            layout: {
              paddingLeft: function(i, node) { return 0; },
              paddingRight: function(i, node) { return 0; },
              paddingTop: function(i, node) { return 0; },
              paddingBottom: function(i, node) { return 2; },
            },*/
          },
          {
            alignment: 'left',
            columns: [
              {
                width: 'auto',
                text: 'Total de registros: ',
                fontSize: 14,
              },
              {
                width: 'auto',
                text: this.wrecords.length,
                fontSize: 14,
                style: {bold: true},
              },
            ],
            columnGap: 10,
            margin: [0, 20],
          },
          {
            alignment: 'left',
            columns: [
              {
                width: 'auto',
                text: 'Elaborado por:',
                fontSize: 14,
              },
              {
                width: 300,
                text: this.user.fullname,
                fontSize: 14,
                style: {bold: true},
                decoration: 'overline',
              },
              {
                width: 'auto',
                text: 'Apobado por: ',
                fontSize: 14,
              },
              {
                width: 'auto',
                text: this.user.supname,
                fontSize: 14,
                style: {bold: true},
                decoration: 'overline',
              },
            ],
            columnGap: 8,
            margin: [0, 30, 0, 0],
          },
          {
            alignment: 'left',
            columns: [
              {
                width: 485,
                text: this.user.position,
                fontSize: 14,
                style: {bold: true},
                margin: [98, 5],
              },
              {
                width: 'auto',
                text: this.user.supposition,
                fontSize: 14,
                style: {bold: true},
            },
            ],
            columnGap: 10,
          },
        ],
        pageMargins: [5, 25, 5, 25],
      };
      pdfMake.createPdf(this.docDefinition).download('CITMATEL Registro de taller');
    });
  }

  generateReceipt(index: number) {
    this.table_to_print = [
      [{text: 'UEB Sistemas de Cómputo', alignment: 'center', colSpan: 2}, {text: ''}],
      [{text: 'CITMATEL', alignment: 'center', bold: true, colSpan: 2}, {text: ''}],
      // tslint:disable-next-line: max-line-length
      [
        {text: 'Fecha: ' + moment.utc(this.wrecords[index].fecha_entrada).format('DD/MM/YYYY'), alignment: 'left'},
        {text: 'Número de serie: ' + this.wrecords[index].serie, alignment: 'left'},
      ],
      [
        {text: 'Cliente: ' + this.wrecords[index].cliente, alignment: 'left', colSpan: 2},
      ],
      [
        {text: 'Equipo: ' + this.wrecords[index].equipo + ' ' + this.wrecords[index].marca + ' ' + this.wrecords[index].modelo, alignment: 'left', colSpan: 2},
      ],
      [
        {text: 'Fallo: ' + this.wrecords[index].fallo, alignment: 'left', colSpan: 2},
      ],
      [
        {text: 'Entregado por: ' + this.wrecords[index].entregado, alignment: 'left', colSpan: 2}, {text: ''},
      ],
      [
        {text: 'Normas para la recojida y entrega de Equios en el Taller', alignment: 'left'},
        {
          table: {
            widths: ['*'],
            body: [
              [{text: 'No.: ' + this.wrecords[index].cod}],
            ],
          },
          layout: {
            paddingLeft: function(i, node) { return 2; },
            paddingRight: function(i, node) { return 2; },
            paddingTop: function(i, node) { return 2; },
            paddingBottom: function(i, node) { return 2; },
          },
        },
      ],
      [
        {
          ol: [
            'Horario: 8:30AM a 5:00PM',
            'Solicite información del estado de su equipo al 31342603 o personalmente indicando siempre el número de esta tarjeta.',
            // tslint:disable-next-line: max-line-length
            ['Para recoger su equipo, es obligatorio:', ['- La presentación de esta tarjeta.', '- Haber pagado el servicio correspondiente']], {text: 'Transcurridos 60 días de facturado el equipo y no ser recogido, CITMATEL se reserva el derecho de no recepcionar nuevos equipos hasta tanto no se retire el que se encuentra en las Instalaciones de la UEB de sistemas de Cómputo.', alignment: 'justify'},
          ],
          colSpan: 2,
        },
        {text: ''},
      ],
    ];
    this.docDefinition = {
      info: {
        title: 'Comprobante de entrega',
      },
      footer: function(currentPage, pageCount) {
        return {
          text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
          alignment: 'right',
          margin: [2, 2, 5, 2],
          fontSize: 10,
        };
      },
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      content: [
        {
          table: {
            widths: ['*', 200],
            body: this.table_to_print,
          },
          layout: {
            paddingLeft: function(i, node) { return 2; },
            paddingRight: function(i, node) { return 2; },
            paddingTop: function(i, node) { return 2; },
            paddingBottom: function(i, node) { return 2; },
            vLineWidth: function (i) { if (i === 1) { return 0; } return 1; },
            hLineWidth: function (i) {  if (i === 1) { return 0; } else if (i === 8) { return 0; } return 1; },
          },
        },
      ],
      pageMargins: [25, 25, 25, 25],
    };
    pdfMake.createPdf(this.docDefinition).download('CITMATEL Comprobante ' + this.wrecords[index].cod);
  }

  generateDiagnostic(index: number) {
    this.docDefinition = {
      info: {
        title: 'Modelo de diagnóstico ' + this.wrecords[index].equipo + ' ' + this.wrecords[index].marca,
      },
      footer: function(currentPage, pageCount) {
        return {
          table: {
            widths: ['*'],
            body: [
              [{text: 'Ave. 47 e/ 18 Ay 20, Miramar, Playa, Ciudad de la Habana. CUBA. CP 11300', alignment: 'center'}],
              [{text: 'Tel: (537) 204 3600 / 206 9300. Fax (537) 2048202', alignment: 'center'}],
              [{text: 'E-mail: citmatel@citmatel.cu / http://www.citmatel.cu / www.bazar-virtual.com', alignment: 'center'}],
            ],
          },
          layout: {
            hLineWidth: function (i) { if (i > 0) { return 0; } return 1; },
            vLineWidth: function (i) {  return 0; },
            hLineColor: function (i, node) {
              return '#f1eeee';
            },
          },
          alignment: 'center',
          margin: [2, 2, 5, 2],
          fontSize: 10,
          color: '#f1eeee',
        };
      },
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      content: [
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  image: image1,
                  width: 168,
                  height: 60,
                },
                {
                  image: image2,
                  width: 60,
                  height: 76,
                  alignment: 'right',
                },
              ],
            ],
          },
          layout: {
            vLineWidth: function (i) { return 0; },
            hLineWidth: function (i) { return 0; },
          },
        },
        {
          text: 'DIAGNÓSTICO DE MEDIOS DE CÓMPUTO',
          alignment: 'center',
          lineHeight: 2,
        },
        {
          text: 'Entidad: ' + this.wrecords[index].cliente,
          alignment: 'left',
          lineHeight: 2,
        },
        {
          text: '1- Datos del medio defectuoso.',
          alignment: 'left',
        },
        {
          table: {
            widths: [200, 300],
            body: [
              [
                'Tipo/Marca', 'No. Inventario/No. Serie',
              ],
              [
                // tslint:disable-next-line: max-line-length
                this.wrecords[index].equipo + ' / ' + this.wrecords[index].marca, this.wrecords[index].inventario + ' / ' + this.wrecords[index].serie,
              ],
            ],
          },
        },
        {
          text: '  ',
          lineHeight: 2,
        },
        {
          text: '2- Argumentación.',
          alignment: 'left',
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                'OT - ' + this.wrecords[index].ot,
              ],
              [
                'RE - ' + this.wrecords[index].cod,
              ],
              [
                {
                  text: this.wrecords[index].fallo,
                  alignment: 'justify',
                },
              ],
              [
                'CITMATEL no cuenta con las piezas o instrumentos necesarios para su reparación.',
              ],
            ],
          },
          layout: {
            hLineWidth: function (i) { if (i === 1 || i === 2 || i === 3) return 0; return 1; },
          },
        },
        {
          text: '  ',
          lineHeight: 2,
        },
        {
          text: '3- Destino final del medio defectuoso o de sus partes.',
          alignment: 'left',
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                'La entidad no decide el destino final del medio defectuoso.',
              ],
              [
                ' ',
              ],
              [
                ' ',
              ],
              [
                ' ',
              ],
            ],
          },
          layout: {
            hLineWidth: function (i) { if (i === 1 || i === 2 || i === 3) return 0; return 1; },
          },
        },
        {
          text: '  ',
          lineHeight: 2,
        },
        {
          text: '4- Aprobación por la comisión técnica.',
          alignment: 'left',
        },
        {
          text: '  ',
          lineHeight: 2,
        },
        {
          text: 'Defectó: ' + this.user.fullname,
          alignment: 'left',
        },
        {
          text: this.user.position,
          alignment: 'left',
        },
        {
          text: '  ',
          lineHeight: 1,
        },
        {
          text: 'Firma: ____________________',
          alignment: 'left',
        },
        {
          text: 'Fecha: ' + moment.utc().format('DD/MM/YYYY'),
          lineHeight: 1,
        },
        {
          text: '  ',
          lineHeight: 3,
        },
        {
          text: 'Fecha de entrega a la contabilidad: ____________________',
          alignment: 'left',
        },
      ],
      pageMargins: [25, 25, 25, 60],
    };
    pdfMake.createPdf(this.docDefinition).download('CITMATEL Diagnóstico ' + this.wrecords[index].cod);
  }

  generateDeliver(index: number) {
    this.workshopService.getWParts(this.wrecords[index].id).subscribe((res: WPart[]) => {
      const tbody = [];
      // tslint:disable-next-line: max-line-length
      tbody.push([{text: 'Concepto', bold: true}, {text: 'U/M', bold: true}, {text: 'Cantidad', bold: true}, {text: 'No. Serie', bold: true}]);
      for (let i = 0; i < res.length; i++) {
        // tslint:disable-next-line: max-line-length
        const part = [res[0].parte + ' ' + res[0].marca + ' ' + res[0].modelo + '' + ((res[0].capacidad !== '-') ? res[0].capacidad : ''), 'U', res[0].cantidad, res[0].serie];
        tbody.push(part);
      }
      this.docDefinition = {
        info: {
          title: 'ACTA DE ENTREGA DE EQUIPAMIENTO',
        },
        footer: function(currentPage, pageCount) {
          return {
            table: {
              widths: ['*'],
              body: [
                [{text: 'Ave. 47 e/ 18 Ay 20, Miramar, Playa, Ciudad de la Habana. CUBA. CP 11300', alignment: 'center'}],
                [{text: 'Tel: (537) 204 3600 / 206 9300. Fax (537) 2048202', alignment: 'center'}],
                [{text: 'E-mail: citmatel@citmatel.cu / http://www.citmatel.cu / www.bazar-virtual.com', alignment: 'center'}],
              ],
            },
            layout: {
              hLineWidth: function (i) { if (i > 0) { return 0; } return 1; },
              vLineWidth: function (i) {  return 0; },
              hLineColor: function (i, node) {
                return '#f1eeee';
              },
            },
            alignment: 'center',
            margin: [2, 2, 5, 2],
            fontSize: 10,
            color: '#f1eeee',
          };
        },
        pageSize: 'LETTER',
        pageOrientation: 'portrait',
        content: [
          {
            table: {
              widths: ['*', '*'],
              body: [
                [
                  {
                    image: image1,
                    width: 168,
                    height: 60,
                  },
                  {
                    image: image2,
                    width: 60,
                    height: 76,
                    alignment: 'right',
                  },
                ],
              ],
            },
            layout: {
              vLineWidth: function (i) { return 0; },
              hLineWidth: function (i) { return 0; },
            },
          },
          {
            text: '  ',
            lineHeight: 2,
          },
          {
            text: 'R05.07',
            alignment: 'right',
            bold: true,
            size: 14,
          },
          {
            text: '  ',
            lineHeight: 2,
          },
          {
            text: 'ACTA DE ENTREGA DE EQUIPAMIENTO',
            alignment: 'center',
            bold: true,
            size: 10,
          },
          {
            table: {
              widths: [40, '*', 120],
              body: [
                [
                  'Cliente', this.wrecords[index].cliente, 'Fecha: ' + moment.utc().format('DD/MM/YYYY'),
                ],
                [
                  // tslint:disable-next-line: max-line-length
                  {text: '', border: [true, true, false, true]}, {text: '', border: [false, true, true, true]}, 'No. de Entrada: ' + this.wrecords[index].cod,
                ],
              ],
            },
          },
          {
            text: '  ',
            lineHeight: 2,
          },
          {
            table: {
              widths: ['*', 25, 50, 200],
              body: tbody,
            },
          },
          {
            text: '  ',
            lineHeight: 3,
          },
          {
            table : {
              widths: ['*', '*'],
              body: [
                [
                  'Recibe', 'Entrega',
                ],
                [
                  ' ', ' ',
                ],
                [
                  'Nombre: ' + this.wrecords[index].recogido, 'Nombre: ' + this.user.fullname,
                ],
                [
                  'No. CI: ', 'No. CI: ',
                ],
                [
                  'Cargo: ', 'Cargo: ' + this.user.position,
                ],
                [
                  ' ', ' ',
                ],
                [
                  'Firma: ____________________', 'Firma: ____________________',
                ],
              ],
            },
            layout: {
              vLineWidth: function (i) { return 0; },
              hLineWidth: function (i) { return 0; },
            },
          },
        ],
        pageMargins: [25, 25, 25, 60],
      };
      pdfMake.createPdf(this.docDefinition).download('CITMATEL Acta de entrega ' + this.wrecords[index].cod);
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.search();
  }

  search() {
    // console.log(this.search_string);
    let strtosearch = 'null';
    if (this.search_string !== '') {
      strtosearch = this.search_string;
    }
    this.workshopService.searchRecord(strtosearch, this.config.currentPage, this.user.id_emp).subscribe((res: {total, wrecords}) => {
      this.config.totalItems = res.total;
      this.wrecords = res.wrecords;
      if (this.wrecords.length > 0 && this.search_string) {
        this.search_status = 'success';
      } else if (!this.search_string) {
        this.search_status = 'info';
      } else {
        this.search_status = 'danger';
      }
      // console.log(this.wrecords);
    });
  }

  openNew() {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewWRecordComponent).onClose.subscribe(
      (newWRecord) => {
        if (newWRecord) {
          this.search();
        }
      },
    );
  }

  openUpdt(i: number) {
    this.dialogService.open(UpdtWRecordComponent, {context: {wrecord: Object.assign({}, this.wrecords[i])}}).onClose.subscribe(
      (updtrecord) => {
        if (updtrecord) {
          this.search();
        }
      },
    );
  }

  openParts(i: number) {
    this.dialogService.open(WpartsComponent, {context: {wrecord: Object.assign({}, this.wrecords[i])}}).onClose.subscribe(
      (updtrecord) => {
        
      },
    );
  }

  deleteRecord(id: number) {
    Swal.fire({
      title: 'Confirma que desea eliminar el registro "' + this.wrecords[id].cod + '"?',
      text: 'Se eliminarán todos sus datos del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.workshopService.delete(this.wrecords[id].id).subscribe(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Registro eliminado correctamente.',
          } as SweetAlertOptions);
          this.search();
        });
      }
    });
  }

}
