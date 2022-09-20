import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortSerial',
})
export class ShortSerialPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 6) {
      return value.substring(0, 6);
    }
    return value;
  }

}
