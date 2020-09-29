import {
  Component, OnInit,
} from '@angular/core';
import { WorkshopService } from '../../services/workshop.service';
import { NbAuthService } from '@nebular/auth';
import { WRecord } from '../../models/WRecord';
import { NbDialogService } from '@nebular/theme';
import 'moment/min/locales';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { NewWRecordComponent } from '../new-wrecord/new-wrecord.component';
import { UpdtWRecordComponent } from '../updt-wrecord/updt-wrecord.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  constructor(private userService: UserService,
    private workshopService: WorkshopService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
      };
    }

  ngOnInit() {
    this.search();
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
    this.workshopService.searchRecord(strtosearch, this.config.currentPage).subscribe((res: {total, wrecords}) => {
      this.config.totalItems = res.total;
      this.wrecords = res.wrecords;
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

}
