import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ERecord } from '../models/ERecord';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class EnergyService {

  constructor(private http: HttpClient) { }

  getERecords(year: number, month: number) {
    return this.http.get(ipserver + 'energy/list/' + year + '&' + month, {responseType: 'json'});
  }

  getMonths(year: number) {
    return this.http.get(ipserver + 'energy/months/' + year, {responseType: 'json'});
  }

  getEReading(date: string) {
    return this.http.get(ipserver + 'energy/reading/' + date, {responseType: 'json'});
  }

  saveERecord(newrecord: ERecord) {
    return this.http.post(ipserver + 'energy/create', newrecord);
  }

  updateERecord(id: number, newrecord: ERecord) {
    return this.http.put(ipserver + 'energy/update/' + id, newrecord);
  }

  updateAllERecord(newrecords: ERecord[]) {
    return this.http.put(ipserver + 'energy/updateAll', newrecords);
  }

  updateAllPlans(plan: number, inicio: Date, fin: Date) {
    return this.http.put(ipserver + 'energy/updatePlans', {plan: plan, start: inicio, end: fin});
  }

  deleteERecord(id: number) {
    return this.http.delete(ipserver + 'energy/' + id);
  }
}
