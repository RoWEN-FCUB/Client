import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
// import { of as observableOf, from } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
//import { AnalyticsService } from './utils';
// import { UserData } from './data/users';
// import { UserService } from './mock/users.service';
// import { MockDataModule } from './mock/mock-data.module';
import { RoleProvider } from './role.provider';
import ipserver from '../ipserver';
// import { HttpResponse } from '@angular/common/http';

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
        },
        baseEndpoint: ipserver,
        login: {
          endpoint: 'user/login',
          method: 'post',
          defaultMessages: ['Accediendo al sistema...'],
          defaultErrors: ['Datos de usuario incorrectos.'],
          redirect: {
            success: '/pages/dashboard',
            failure: 'user/login',
          },
        },
        refreshToken: {
          endpoint: 'user/refresh',
          method: 'post',
          requireValidToken: true,
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
        redirectDelay: 1000, // delay before redirect after a successful login, while success message is shown to the user
        strategy: 'email',  // strategy id key.
        rememberMe: false,   // whether to show or not the `rememberMe` checkbox
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        },
      },
      logout: {
        redirectDelay: 500,
        strategy: 'email',
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {      
      user: {
        view: ['dashboard', 'profile', 'tasks', 'notifications', 'delivers'], /*
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
        view: ['workshop', 'energy'],
      },
      comercial: {
        parent: 'user',
        view: ['comercial', 'energy'],
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
  //AnalyticsService,
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
