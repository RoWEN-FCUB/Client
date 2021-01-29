import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf, from } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AnalyticsService } from './utils';
import { UserData } from './data/users';
import { UserService } from './mock/users.service';
import { MockDataModule } from './mock/mock-data.module';
import { RoleProvider } from './role.provider';
import ipserver from '../ipserver';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

/*const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];*/

export const NB_CORE_PROVIDERS = [
  // ...MockDataModule.forRoot().providers,
  // ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          // key: 'token',
        },
        // baseEndpoint: 'http://app-f2a3c51f-6e3a-4980-a984-74bda65da601.cleverapps.io/',
        // baseEndpoint: 'http://104.207.147.123:3128/',
        baseEndpoint: 'https://localhost:3128/',
        // baseEndpoint: 'https://169.158.137.126:3128/',
        login: {
          endpoint: 'user/login',
          method: 'post',
          redirect: {
            success: '/',
            failure: null,
          },
        },
        logout: {
          endpoint: '',
          redirect: {
            success: '/',
            failure: null,
          },
        },
      }),
    ],
    forms: {
      login: {
        redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
        strategy: 'email',  // strategy id key.
        rememberMe: false,   // whether to show or not the `rememberMe` checkbox
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        }, // social links at the bottom of a page
      },
      logout: {
        redirectDelay: 500,
        strategy: 'email',
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: ['dashboard'],
      },
      user: {
        parent: 'guest',
        view: ['profile', 'tasks', 'notifications'], /*
        create: '*',
        edit: '*',
        remove: '*',*/
      },
      energy: {
        parent: 'user',
        view: ['energy', 'gee'],
      },
      tec: {
        parent: 'user',
        view: ['workshop'], /*
        create: '*',
        edit: '*',
        remove: '*',*/
      },
      admin: {
        view: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: RoleProvider,
    /*useValue: {
      getRole: () => {
        return observableOf('user');
      },
    },*/
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
