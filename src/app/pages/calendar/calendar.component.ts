import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  dates: Date[];
  allowWeekends: boolean = false;

  constructor(protected dialogRef: NbDialogRef<any>){}

  onDateSelect(dates: Date[]): void{
    this.dates = dates;
  }

  save() {
    this.dialogRef.close(this.dates);
  }

  close() {
    const noDates: Date[] = []
    this.dialogRef.close(noDates);
  }

  public disabledDates = (date: Date): boolean => {
    //return date.getDate() % 2 === 0;
    if ((moment(date).day() === 0 || moment(date).day() === 6) && !this.allowWeekends) {
      return true;
    }
    return false;
  };

  weekends_change(e) {
    this.allowWeekends = e;
  }
}
