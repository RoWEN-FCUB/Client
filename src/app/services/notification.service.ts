import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import ipserver from '../ipserver';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNewNotifications(id: number) {
    /*return Observable.interval(5000).flatMap(() => {
      return this.http.get(ipserver + 'notifications/news/' + id, {responseType: 'json'})
        .pipe(map(res => res));
    });*/
    // return this.http.get(ipserver + 'notifications/news/' + id, {responseType: 'json'});
    // tslint:disable-next-line: max-line-length
    return interval(5000).pipe(switchMap(() => this.http.get(ipserver + 'notifications/' + id, {responseType: 'json'})), map(res => res));
  }

  getAllNotifications(id: number) {
    return this.http.get(ipserver + 'notifications/' + id, {responseType: 'json'});
  }

  notificationReaded(id: number) {
    return this.http.put(ipserver + 'notifications/readed/' + id, {responseType: 'json'});
  }

  notificationsReaded(id_usuario: number, id_last_notif: number) {
    return this.http.put(ipserver + 'notifications/allreaded/' + id_usuario + '&' + id_last_notif, {responseType: 'json'});
  }

  deleteNotification(id: number) {
    return this.http.delete(ipserver + 'notifications/' + id, {responseType: 'json'});
  }

  deleteAllNotifications(id_usuario: number) {
    return this.http.delete(ipserver + 'notifications/all/' + id_usuario, {responseType: 'json'});
  }
}
