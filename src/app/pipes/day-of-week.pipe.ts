import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {

  transform(value: Date, showtype?: number): string {
    if (value) {
      if (showtype === 1) {
        return moment(value).locale('es').format('dddd D');
      } else if (showtype === 2) {
        return moment.utc(value).locale('es').format('dddd').toUpperCase();
      } else if (showtype === 3) {
        const dnumber = moment.utc(value).day();
        if (dnumber === 0 || dnumber === 6) {
          return 'bg-light';
        } else {
          return 'bg-white';
        }
      }
      return moment(value).locale('es').format('dddd D [de] MMMM');
    }
    return '';
  }

}
