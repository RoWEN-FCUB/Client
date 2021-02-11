import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { WRecord } from '../../models/WRecord';
import { WPart } from '../../models/WPart';
import { WorkshopService } from '../../services/workshop.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'wparts',
  templateUrl: './wparts.component.html',
  styleUrls: ['./wparts.component.css'],
})
export class WpartsComponent implements OnInit {
  wrecord: WRecord;
  parts: WPart[] = [];
  partes: string[] = [];
  marcas: string[] = [];
  modelos: string[] = [];
  capacidades: string[] = [];
  series: string[] = [];
  partes_status: string[] = [];
  marcas_status: string[] = [];
  modelos_status: string[] = [];
  capacidades_status: string[] = [];
  series_status: string[] = [];
  cantidades_status: string[] = [];

  constructor(protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService) {

  }

  ngOnInit(): void {
    this.workshopService.getWParts(this.wrecord.id).subscribe((res: WPart[]) => {
      this.parts = res;
      for (let i = 0; i < res.length; i++) {
        this.partes_status.push('info');
        this.marcas_status.push('info');
        this.modelos_status.push('info');
        this.capacidades_status.push('info');
        this.series_status.push('info');
        this.cantidades_status.push('info');
      }
    });
    this.workshopService.getWAllParts().subscribe((res: WPart[]) => {
      for (let i = 0; i < res.length; i++) {
        this.partes.push(res[i].parte);
      }
    });
  }

  partLostFocus(index: number) {
    if (this.parts[index].parte) {
      this.marcas = [];
      this.workshopService.getWPartMarcs(this.parts[index].parte).subscribe((res: WPart[]) => {
        for (let i = 0; i < res.length; i++) {
          this.marcas.push(res[i].marca);
        }
      });
      this.capacidades = [];
      this.workshopService.getWPartCaps(this.parts[index].parte).subscribe((res: WPart[]) => {
        for (let i = 0; i < res.length; i++) {
          this.capacidades.push(res[i].capacidad);
        }
      });
    }
  }

  marcLostFocus(index: number) {
    if (this.parts[index].parte && this.parts[index].marca) {
      this.modelos = [];
      this.workshopService.getWPartModels(this.parts[index].parte, this.parts[index].marca).subscribe((res: WPart[]) => {
        for (let i = 0; i < res.length; i++) {
          this.modelos.push(res[i].modelo);
        }
      });
    }
  }

  newPart() {
    const newpart: WPart = {
      id: null,
      parte: '',
      marca: '',
      modelo: '',
      capacidad: '',
      cantidad: 0,
      serie: '',
      id_reg: this.wrecord.id,
    };
    this.partes_status.push('info');
    this.marcas_status.push('info');
    this.modelos_status.push('info');
    this.capacidades_status.push('info');
    this.series_status.push('info');
    this.cantidades_status.push('info');
    this.parts.push(newpart);
  }

  deletePart(i: number) {
    this.workshopService.deletePart(this.parts[i].id).subscribe(res => {
      this.parts.splice(i, 1);
      this.partes_status.splice(i, 1);
      this.marcas_status.splice(i, 1);
      this.modelos_status.splice(i, 1);
      this.capacidades_status.splice(i, 1);
      this.cantidades_status.splice(i, 1);
      this.series_status.splice(i, 1);
    });
  }

  partChange(i: number) {
    if (this.parts[i].parte) {
      this.partes_status[i] = 'success';
    } else {
      this.partes_status[i] = 'danger';
    }
  }

  marcChange(i: number) {
    if (this.parts[i].marca) {
      this.marcas_status[i] = 'success';
    } else {
      this.marcas_status[i] = 'danger';
    }
  }

  modelChange(i: number) {
    if (this.parts[i].modelo) {
      this.modelos_status[i] = 'success';
    } else {
      this.modelos_status[i] = 'danger';
    }
  }

  capChange(i: number) {
    if (this.parts[i].capacidad) {
      this.capacidades_status[i] = 'success';
    } else {
      this.capacidades_status[i] = 'danger';
    }
  }

  serieChange(i: number) {
    if (this.parts[i].serie) {
      this.series_status[i] = 'success';
    } else {
      this.series_status[i] = 'danger';
    }
  }

  amountChange(i: number) {
    if (!isNaN(this.parts[i].cantidad) && this.parts[i].cantidad) {
      this.cantidades_status[i] = 'success';
    } else {
      this.cantidades_status[i] = 'danger';
    }
  }

  save() {
    let fail = false;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    for (let i = 0; i < this.partes_status.length; i++) {
      if (this.partes_status[i] === 'danger' || !this.parts[i].parte) {
        fail = true;
        this.partes_status[i] = 'danger';
        break;
      }
    }
    for (let i = 0; i < this.marcas_status.length; i++) {
      if (this.marcas_status[i] === 'danger' || !this.parts[i].marca) {
        fail = true;
        this.marcas_status[i] = 'danger';
        break;
      }
    }
    for (let i = 0; i < this.modelos_status.length; i++) {
      if (this.modelos_status[i] === 'danger' || !this.parts[i].modelo) {
        fail = true;
        this.modelos_status[i] = 'danger';
        break;
      }
    }
    for (let i = 0; i < this.capacidades_status.length; i++) {
      if (this.capacidades_status[i] === 'danger' || !this.parts[i].capacidad) {
        fail = true;
        this.capacidades_status[i] = 'danger';
        break;
      }
    }
    for (let i = 0; i < this.cantidades_status.length; i++) {
      if (this.cantidades_status[i] === 'danger' || !this.parts[i].cantidad) {
        fail = true;
        this.cantidades_status[i] = 'danger';
        break;
      }
    }
    for (let i = 0; i < this.series_status.length; i++) {
      if (this.series_status[i] === 'danger' || !this.parts[i].serie) {
        fail = true;
        this.series_status[i] = 'danger';
        break;
      }
    }
    if (!fail) {
      this.workshopService.updateParts(this.parts).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Partes actualizadas.',
        } as SweetAlertOptions);
        this.close();
      });
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Existen datos vacíos o incorrectos.',
      } as SweetAlertOptions);
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
