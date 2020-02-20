import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let idToken = null;
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      idToken = token;
    });
    if (idToken) {
      const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + idToken),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
