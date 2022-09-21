import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { GeeService } from '../../services/gee.service';
import { GEecord } from '../../models/GRecord';
import { NbDialogService } from '@nebular/theme';
import { NewGrecordComponent } from '../new-grecord/new-grecord.component';

@Component({
  selector: 'gee',
  templateUrl: './gee.component.html',
  styleUrls: ['./gee.component.css'],
})
export class GeeComponent implements OnInit {
  gees = [];
  user = {id: 0};
  selectedGEE: number = -1;
  grecords: GEecord[] = [];

  constructor(private geeService: GeeService, private authService: NbAuthService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.geeService.listGEEsByUser(this.user.id).subscribe((res: any[]) => {
        for (let i = 0; i < res.length; i++) {
          this.gees.push(res[i]);
        }
        if (this.gees.length > 0) {
          this.selectedGEE = this.gees[0].id;
          this.geeService.listGEERecords(this.selectedGEE).subscribe((grcords: GEecord[]) => {
            this.grecords = grcords;
            // console.log(this.grecords);
          });
        }
      });
    });
  }

  onChangeGee() {
    this.geeService.listGEERecords(this.selectedGEE).subscribe((grcords: GEecord[]) => {
      this.grecords = grcords;
      // console.log(this.grecords);
    });
  }

  openNew() {
    this.dialogService.open(NewGrecordComponent, {context: {title: 'Nueva operación'}}).onClose.subscribe(res => {
      this.onChangeGee();
    });
  }

}
