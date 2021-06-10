import { Component, OnInit, HostListener } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';
import { NbAuthJWTToken, NbAuthResult, NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: 'pages.component.html',
})
export class PagesComponent implements OnInit {
  constructor(private accessChecker: NbAccessChecker, private menuService: NbMenuService, private authService: NbAuthService) {

  }
  menu = MENU_ITEMS;

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

  ngOnInit(): void {
    this.authService.onAuthenticationChange().subscribe(autenticated => {
      this.menu = [];
      this.menu.push(
        {
          title: 'Inicio',
          icon: 'home-outline',
          link: '/pages/dashboard',
          home: true,
        },
      );
      if (!autenticated) {
        this.menu.push(
          {
            title: 'Usuarios',
            icon: 'lock-outline',
            children: [
              {
                title: 'Acceso',
                link: '/auth/login',
                icon: 'log-in-outline',
              },
            ],
          },
        );
      }
      this.accessChecker.isGranted('view', 'tasks').subscribe(granted => {
        if (granted) {
          this.menu.push(
            {
              title: 'Tareas',
              icon: 'calendar-outline',
              link: '/pages/tasks',
            },
          );
        }
      });
      this.accessChecker.isGranted('view', 'workshop').subscribe(granted => {
        if (granted) {
          this.menu.push(
            {
              title: 'Taller',
              icon: 'monitor-outline',
              link: '/pages/workshop',
            },
          );
        }
      });
      this.accessChecker.isGranted('view', 'energy').subscribe(granted => {
        if (granted) {
          this.menu.push(
            {
              title: 'Energía',
              icon: 'flash-outline',
              link: '/pages/energy',
            },
          );
        }
      });
      /*this.accessChecker.isGranted('view', 'gee').subscribe(granted => {
        if (granted) {
          this.menu.push(
            {
              title: 'GEE',
              icon: 'charging-outline',
              link: '/pages/gee',
            },
          );
        }
      });*/
      this.accessChecker.isGranted('view', 'comercial').subscribe(granted => {
        if (granted) {
          this.menu.push(
            {
              title: 'Comercial',
              icon: 'car-outline',
              link: '/pages/comercial',
            },
          );
        }
      });
      this.accessChecker.isGranted('view', 'admin_menu').subscribe( granted => {
        if (granted) {
          this.menu.push(
            {
              title: 'Sistema',
              icon: 'settings-2-outline',
              children: [
                {
                  title: 'Usuarios',
                  icon: 'people-outline',
                  link: '/pages/admin/users',
                },
                {
                  title: 'Empresas',
                  icon: 'globe-outline',
                  link: '/pages/admin/company',
                },
                {
                  title: 'Servicios',
                  icon: 'layers-outline',
                  link: '/pages/admin/service',
                },
              ],
            },
          );
        }
      });
    });
  }

  buscarMenu(title: string) {
    for (let i = 0; i < this.menu.length; i++) {
      if (this.menu[i].title === title) {
        return i;
      }
    }
    return -1;
  }
}
