import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getObservText'
})
export class GetObservTextPipe implements PipeTransform {

  transform(value: string[]): string {
    if (value.length === 1) {
      return value.length + ' anotación.';
    } else {
      return value.length + ' anotaciones.';
    }
  }

}
