import { Component, OnDestroy, OnInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import ipserver from '../../../ipserver';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/Notification';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  deviceInfo = null;
  isMobile = false;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user = {name: '', picture: '', id: 0, role: '', id_emp: 0};
  company: Company;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];
  userpicture = '';
  currentTheme = 'default';
  new_notifications: Notification[] = [];
  notif: Subscription = new Subscription();
  updating_notif: boolean = true; // no recargar notificaciones cuando este marcando una como leida
  // tslint:disable-next-line: max-line-length
  userMenu = [ { title: 'Perfil', icon: 'person-outline', link: '/pages/editProfile' }, { title: 'Cerrar sesión', icon: 'power-outline', link: '/auth/logout'} ];

  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private authService: NbAuthService,
              private breakpointService: NbMediaBreakpointsService,
              private notificationService: NotificationService,
              private cdr: ChangeDetectorRef,
              private companyService: CompanyService,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.companyService.getOne(this.user.id_emp).subscribe((res: Company) => {
          this.company = res;
        });
        try {
          fetch(ipserver + 'public/' + this.user.picture, { method: 'HEAD', headers: {Authentication: 'Bearer ' + token}}).then(res => {
              if (res.ok) {
                  this.userpicture = ipserver + 'public/' + this.user.picture
              } else {
                  this.userpicture = 'assets/avatars/empty.png';
              }
          });
        } catch (error){
          console.log(error);
        }
        this.notificationService.searchNewNotifications(this.user.id);
        this.notificationService.getNotifications().subscribe((res) => {
          if (this.updating_notif) {
            if (res) {
              this.new_notifications = res;
              this.cdr.detectChanges();
            } else {
              this.new_notifications = [];
            }
          }
        });
      } else {
        this.notif.unsubscribe();
      }
    });
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
      this.deviceInfo = this.deviceService.getDeviceInfo();
      this.isMobile = this.deviceService.isMobile();
      // console.log(isMobile);
  }

  tokenExpired(e) {
    // console.log(e);
    if(e.left === 0) {
      console.log('token expired');
      // this.router.navigate(['auth/logout']);
    }
  }

  clickMail() {
    window.open(this.company.email, '_blank');
  }

  clickNotification(link: string) {
    // console.log(link);
    this.router.navigate(['pages/' + link]);
  }

  notificationReaded(id: number) {
    this.updating_notif = false;
    const idnotif = this.new_notifications[id].id;
    this.new_notifications.splice(id, 1);
    this.notificationService.notificationReaded(idnotif).subscribe(res => {
      this.updating_notif = true;
      this.notificationService.searchNewNotifications(this.user.id);
    });
  }

  notificationsReaded() {
    this.updating_notif = false;
    const idnotif = this.new_notifications[0].id;
    this.new_notifications = [];
    this.notificationService.notificationsReaded(this.user.id, idnotif).subscribe(res => {
      this.updating_notif = true;
      this.notificationService.searchNewNotifications(this.user.id);
    });
  }

  viewAllNotifications() {
    this.router.navigate(['pages/notifications']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
