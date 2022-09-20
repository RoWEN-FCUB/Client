import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTime',
})
export class ShortTimePipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(0, 5);
  }

}
