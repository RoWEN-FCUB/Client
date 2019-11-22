import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  transform(value: Date, onlyDay?: boolean): string {
    if (value) {
      if (onlyDay) {
        return moment(value).locale('es').format('dddd D');
      }
      return moment(value).locale('es').format('dddd D [de] MMMM');
    }
    return '';
  }

}
