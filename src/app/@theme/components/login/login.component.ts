import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS, NbAuthResult, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent {
  show_password: boolean = false;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router, private userIdle: UserIdleService) {
    super(service, options, cd, router);
  }

  toogleShowPassword() {
    this.show_password = !this.show_password;
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      // console.log(result);
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.userIdle.resetTimer();
      } else {
        this.errors = result.getErrors();
        console.log(this.errors);
      }

      const redirect = result.getRedirect();
      // console.log(redirect);
      if (redirect) {
        setTimeout(() => {
        return this.router.navigateByUrl(redirect);
      }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
