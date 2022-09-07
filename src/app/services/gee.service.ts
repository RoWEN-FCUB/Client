import { Injectable } from '@angular/core';
import { GEE } from '../models/GEE';
import {HttpClient} from '@angular/common/http';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class GeeService {

  constructor(private http: HttpClient) { }

  listGEEs() {
    return this.http.get(ipserver + 'gee/list/', {responseType: 'json'});
  }

  saveGEE(newGEE: GEE) {
    return this.http.post(ipserver + 'gee', newGEE);
  }

  deleteGEE(id: number) {
    return this.http.delete(ipserver + 'gee/' + id);
  }
}
