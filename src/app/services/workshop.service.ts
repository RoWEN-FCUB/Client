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

  getWRecords(page: number, id_emp: number) {
    return this.http.get(ipserver + 'workshop/records/' + page + '&' + id_emp, {responseType: 'json'});
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

  searchRecord(strtofind: string, page: number, id_emp: number) {
    return this.http.get(ipserver + 'workshop/search/' + strtofind + '&' + page + '&' + id_emp);
  }

  delete(id: number) {
    return this.http.delete(ipserver + 'workshop/' + id);
  }
}
