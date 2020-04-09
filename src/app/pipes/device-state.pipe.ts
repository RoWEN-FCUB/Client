import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceState',
})
export class DeviceStatePipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
      case 'P':
        return {'color': 'blue'};
      case 'R':
        return {'color': 'green'};
      case 'D':
        return {'color': 'red'};
    }
  }

}
