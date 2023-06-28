import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthResult, NbAuthService } from '@nebular/auth';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {

  }

  canActivate() {
    // console.log('revisando');
    return this.authService.isAuthenticatedOrRefresh()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            // console.log('Redireccionando al login...');
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}
