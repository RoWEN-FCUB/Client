/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, HostListener, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';
import { UserIdleService } from 'angular-user-idle';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private iconLibraries: NbIconLibraries, private userIdle: UserIdleService,
    protected router: Router) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome'); // <---- set as default
  }

  ngOnInit() {
    this.analytics.trackPageViews();
    this.userIdle.startWatching();
    // console.log('start watching...');
    this.userIdle.onTimerStart().subscribe(count => this.userIdle.stopTimer());
    this.userIdle.onTimeout().subscribe(() => this.router.navigate(['auth/logout']));
    /*this.userIdle.onTimeout().subscribe(() => {
      this.userIdle.stopTimer();
      this.router.navigate(['auth/logout']);
    });*/
  }
}
