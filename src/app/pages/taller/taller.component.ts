import {
  Component, OnInit, Input, ViewChild, ElementRef,
} from '@angular/core';
import { WorkshopService } from '../../services/workshop.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { WRecord } from '../../models/WRecord';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import 'moment/min/locales';
import Swal from 'sweetalert2';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { NewWRecordComponent } from '../new-wrecord/new-wrecord.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.scss'],
})
export class TallerComponent implements OnInit {

  wrecords: WRecord[];

  constructor(private userService: UserService,
    private workshopService: WorkshopService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllWRecords();
  }

  getAllWRecords() {
    this.workshopService.getWRecords().subscribe((res: WRecord[]) => {
      this.wrecords = res;
      // console.log(this.wrecords);
    });
  }

  openNew() {
    // tslint:disable-next-line: max-line-length
    this.dialogService.open(NewWRecordComponent).onClose.subscribe(
      (newWRecord) => {
        if (newWRecord) {
          this.getAllWRecords();
        }
      },
    );
  }

}
