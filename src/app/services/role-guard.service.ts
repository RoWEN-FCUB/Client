import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
//import { UserService } from './user.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';





@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public router: Router, private authService: NbAuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.authService.isAuthenticated().subscribe(res => {
      if (!res) {
        this.router.navigate(['/auth/login']);
        return false;
      } else {
        const role = route.data.role as string[]; // rol requerido para activar
        this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
          const tokenPayload = token.getPayload();
          if (role.indexOf(tokenPayload.role) === -1) {
            this.router.navigate(['/']);
            return false;
          }
        });
      }
    });
    return true;
  }
}

