import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatState',
})
export class FormatStatePipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
      case 'Pendiente':
        return {'color': 'blue'};
      case 'Cumplida':
        return {'color': 'green'};
      case 'Incumplida':
        return {'color': 'red'};
      case 'Pospuesta':
        return {'color': 'gray'};
      case 'Cancelada':
        return {'color': 'orange'};
    }
  }

}
