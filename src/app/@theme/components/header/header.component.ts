import { Component, OnDestroy, OnInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbPopoverDirective } from '@nebular/theme';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable, Observer, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import ipserver from '../../../ipserver';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/Notification';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user = {name: '', picture: '', id: 0, role: ''};

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
  userMenu = [ { title: 'Perfil', icon: 'person-outline', link: '/pages/editProfile' }, { title: 'Cerrar sesión', icon: 'power-outline', link: '/auth/logout'} ];

  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private authService: NbAuthService,
              private breakpointService: NbMediaBreakpointsService,
              private notificationService: NotificationService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        // console.log(token.getPayload());
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
          this.userpicture = ipserver + 'public/' + this.user.picture;
          this.notif = this.notificationService.getNewNotifications(this.user.id).subscribe((res: Notification[]) => {
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
  }

  clickNotification(link: string) {
    //console.log(link);
    this.router.navigate(['pages/'+link]);
  }

  notificationReaded(id: number) {
    this.updating_notif = false;
    const idnotif = this.new_notifications[id].id;
    this.new_notifications.splice(id, 1);
    this.notificationService.notificationReaded(idnotif).subscribe(res => {
      this.updating_notif = true;
    });
  }

  notificationsReaded() {
    this.updating_notif = false;
    const idnotif = this.new_notifications[0].id;
    this.new_notifications = [];
    this.notificationService.notificationsReaded(this.user.id, idnotif).subscribe(res => {
      this.updating_notif = true;
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
