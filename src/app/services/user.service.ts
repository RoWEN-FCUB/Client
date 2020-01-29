import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { User } from '../models/User';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(ipserver + 'user', {responseType: 'json'});
  }

  getUser(id: number) {
    return this.http.get(ipserver + 'user/' + id, {responseType: 'json'});
  }

  getSub(id: number) {
    return this.http.get(ipserver + 'user/sub/' + id, {responseType: 'json'});
  }

  getSup(id: number) {
    return this.http.get(ipserver + 'user/sup/' + id, {responseType: 'json'});
  }

  saveUser(user: User) {
    return this.http.post(ipserver + 'user', user);
  }

  validUser(user: User) {
    return this.http.post(ipserver + 'user/valid', user);
  }

  saveAvatar(avatar) {
    return this.http.post(ipserver + 'avatar', avatar);
  }

  deleteUser(id: number) {
    return this.http.delete(ipserver + 'user/' + id);
  }

  updateUser(id: number, updatedUser: User): Observable<User> {
    return this.http.put(ipserver + 'user/' + id, updatedUser);
  }

  getRoles() {
    return this.http.get(ipserver + 'roles', {responseType: 'json'});
  }
}
