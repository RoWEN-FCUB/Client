import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'new-grecord',
  templateUrl: './new-grecord.component.html',
  styleUrls: ['./new-grecord.component.scss'],
})
export class NewGrecordComponent implements OnInit {
  title: string = '';

  constructor(protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(null);
  }
}
