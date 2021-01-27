import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getServices(userid: number) {
    return this.http.get(ipserver + 'user-service/get/' + userid, {responseType: 'json'});
  }
}
