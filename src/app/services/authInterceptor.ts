import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { NbAuthService, NbAuthToken, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector,
              @Inject(NB_AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do not intercept request whose urls are filtered by the injected filter
      if (!this.filter(req)) {
        return this.authService.isAuthenticatedOrRefresh()
          .pipe(
            switchMap(authenticated => {
              if (authenticated) {
                  return this.authService.getToken().pipe(
                    switchMap((token: NbAuthToken) => {
                      const JWT = `Bearer ${token.getValue()}`;
                      req = req.clone({
                        setHeaders: {
                          Authorization: JWT,
                        },
                      });
                      return next.handle(req);
                    }),
                  )
              } else {
                 // Request is sent to server without authentication so that the client code
                 // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
                return next.handle(req);
              }
            }),
          )
      } else {
      return next.handle(req);
    }
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }

}
