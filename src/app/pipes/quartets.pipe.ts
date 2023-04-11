import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quartets'
})
export class QuartetsPipe implements PipeTransform {

  transform(value: string): string {    
    value = value.replace(/\s/g, "");
    let result = "";
    for (let i = 0; i < value.length; i += 4) {
      result += value.substring(i, i + 4) + " ";
    }
    return result.trim();
  }

}
