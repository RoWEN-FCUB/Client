import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';
@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {

  transform(value: number, users: User[]): string {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === value) {
        return users[i].fullname;
      }
    }
    return 'null';
  }

}
