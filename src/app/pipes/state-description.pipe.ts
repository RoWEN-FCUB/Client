import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateDescription',
})
export class StateDescriptionPipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
      case 'P':
        return 'Pendiente: El equipo aún no se diagnostica.';
      case 'R':
        return 'Reparado: El equipo está reparado.';
      case 'D':
        return 'Diagnosticado: El equipo no tiene solución.';
    }
  }

}
