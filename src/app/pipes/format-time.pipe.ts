import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: Date, duration: number): string {
    const duracion = moment.utc(value).add(duration, 'minutes').format('LT');
    const hora = moment.utc(value).format('LT');
    return hora + ' - ' + duracion;
  }

}
