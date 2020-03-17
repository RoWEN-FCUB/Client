import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyDate',
})
export class OnlyDatePipe implements PipeTransform {

  transform(value: Date): string {
    const d = value.toString();
    return d.substr(0, d.indexOf('T'));
  }

}
