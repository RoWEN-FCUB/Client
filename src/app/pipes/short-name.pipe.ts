import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {

  transform(value: string): string {
    // encuentra la cantidad de espacios en el nombre
    // para mostrar solo el nombre y el 1er apellido
    if (value) {
      const arr = value.split(' ');
      if (arr.length > 1) {
        return arr[0] + ' ' + arr[1];
      }
      return value;
    }
    return '';
  }

}
