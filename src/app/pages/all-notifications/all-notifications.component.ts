import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/Notification';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.scss'],
})
export class AllNotificationsComponent implements OnInit {
  user = {name: '', picture: '', id: 0, role: ''};
  constructor(private authService: NbAuthService, private notificationService: NotificationService, private router: Router) { }
  notificaciones: Notification[] = [];
  hay_nuevas: boolean = false;

  ngOnInit() {
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.getNotifications();
    });
  }

  notificationReaded(id: number) {
    const idnotif = this.notificaciones[id].id;
    this.notificaciones[id].leida = true;
    this.notificationService.notificationReaded(idnotif).subscribe(res => {
      // this.getNotifications();
      this.notificationService.searchNewNotifications(this.user.id);
    });
  }

  notificationsReaded() {
    const idnotif = this.notificaciones[0].id;
    this.notificaciones = [];
    this.notificationService.notificationsReaded(this.user.id, idnotif).subscribe(res => {
      this.getNotifications();
      this.notificationService.searchNewNotifications(this.user.id);
    });
  }

  deleteNotification(id: number) {
    const idnotif = this.notificaciones[id].id;
    this.notificaciones.splice(id, 1);
    this.notificationService.deleteNotification(idnotif).subscribe(res => {
      // this.getNotifications();
      this.notificationService.searchNewNotifications(this.user.id);
    });
  }

  deleteAllNotifications() {
    Swal.fire({
      title: 'Confirma que desea eliminar todas las notificaciones?',
      text: 'Después de eliminadas no se podrán recuperar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí­',
      cancelButtonText: 'No',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.notificaciones = [];
        this.notificationService.deleteAllNotifications(this.user.id).subscribe(res => {
          this.getNotifications();
          this.notificationService.searchNewNotifications(this.user.id);
        });
      }
    });

  }

  clickNotification(link: string) {
    // console.log(link);
    this.router.navigate(['pages/' + link]);
  }

  formatDate(date: Date) {
    const fdate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    return fdate;
  }

  bgColor(status: string) {
    switch (status) {
      case 'danger': {
        return '#ffe3ed';
      }
      case 'warning': {
        return '#fffdf9';
      }
      case 'success': {
        return '#c2e8ce';
      }
      case 'info': {
        return '#64ccda';
      }
    }
  }

  getNotifications() {
    this.hay_nuevas = false;
    this.notificationService.getAllNotifications(this.user.id).subscribe((res: Notification[]) => {
      this.notificaciones = res;
      this.notificationService.searchNewNotifications(this.user.id);
      for (let i = 0; i < this.notificaciones.length; i++) {
        if (!this.notificaciones[i].leida) {
          this.hay_nuevas = true;
          break;
        }
      }
    });
  }

}
