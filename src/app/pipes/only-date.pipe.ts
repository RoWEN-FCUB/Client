import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyDate',
})
export class OnlyDatePipe implements PipeTransform {

  transform(value: Date): string {
    if (value) {
      const d = value.toString();
      return d.substring(0, d.indexOf('T'));
    }
    return '';
  }
}
