import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getObservations'
})
export class GetObservationsPipe implements PipeTransform {

  transform(value: string): string[] {
    if (value) {
      return value.split('_');
    } else {
      return [];
    }
  }

}
