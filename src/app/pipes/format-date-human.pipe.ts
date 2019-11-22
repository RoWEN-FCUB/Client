import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'formatDateHuman'
})
export class FormatDateHumanPipe implements PipeTransform {

  transform(value: Date): string {
    return moment(value).locale('es').format('LL');
  }

}
