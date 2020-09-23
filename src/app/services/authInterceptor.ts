import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService, public router: Router) {}

  /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let idToken = null;
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      idToken = token;
      if (idToken) {
        if (!idToken.isValid()) {
          this.router.navigate(['/auth/login']);
        }
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + idToken),
        });
        return next.handle(cloned);
      }
    });
    // console.log('token invalido');
    return next.handle(req);
  }*/

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthJWTToken) => {
        if (token) {
          if (!token.isValid()) {
             this.router.navigate(['/auth/login']);
          }
          const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
          });
          return next.handle(cloned);
        } else {
          return next.handle(req);
        }
      }),
    );
  }
}
