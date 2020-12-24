import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: 'pages.component.html',
})
export class PagesComponent implements OnInit {
  constructor(private accessChecker: NbAccessChecker, private menuService: NbMenuService, private authService: NbAuthService) {

  }
  menu = MENU_ITEMS;

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
      this.accessChecker.isGranted('view', 'gee').subscribe(granted => {
        if (granted) {
          this.menu.push(
            {
              title: 'GEE',
              icon: 'charging-outline',
              link: '/pages/gee',
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
