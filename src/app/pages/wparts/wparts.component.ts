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

  constructor(protected dialogRef: NbDialogRef<any>, private workshopService: WorkshopService) {

  }

  ngOnInit(): void {
    this.workshopService.getWParts(this.wrecord.id).subscribe((res: WPart[]) => {
      this.parts = res;
    });
  }

  newPart() {
    const newpart: WPart = {
      id_reg: this.wrecord.id,
      cantidad: 0,
      capacidad: '',
      marca: '',
      modelo: '',
      parte: '',
      serie: '',
    };
    this.parts.push(newpart);
  }

  deletePart(i: number) {
    this.parts.splice(i, 1);
  }

  close() {
    this.dialogRef.close(null);
  }

}
