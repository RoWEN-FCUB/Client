/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, HostListener, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthResult, NbAuthService } from '@nebular/auth';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private iconLibraries: NbIconLibraries, private authService: NbAuthService) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome'); // <---- set as default
  }

  /*@HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
      // your click logic
      // console.log('clicked');
      this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
        if (token) {
          if (!token.isValid()) {
             this.authService.logout('email');
          } else {
            this.authService.refreshToken('email', token).subscribe((result: NbAuthResult) => {});
          }
        }
      });
  }*/

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
