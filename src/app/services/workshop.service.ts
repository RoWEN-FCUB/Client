import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { WRecord } from '../models/WRecord';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  getWRecords() {
    return this.http.get(ipserver + 'workshop', {responseType: 'json'});
  }

  getWClients() {
    return this.http.get(ipserver + 'workshop/clients', {responseType: 'json'});
  }

  getWDevices() {
    return this.http.get(ipserver + 'workshop/devices', {responseType: 'json'});
  }

  getWNames() {
    return this.http.get(ipserver + 'workshop/names', {responseType: 'json'});
  }

  saveRecord(record: WRecord) {
    return this.http.post(ipserver + 'workshop', record);
  }

  updateRecord(id: number, record: WRecord) {
    return this.http.put(ipserver + 'workshop/' + id, record);
  }
}
