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

  getERecords(year: number, month: number, id_emp: number) {
    return this.http.get(ipserver + 'energy/list/' + year + '&' + month + '&' + id_emp, {responseType: 'json'});
  }

  getMonths(year: number, id_emp: number) {
    return this.http.get(ipserver + 'energy/months/' + year + '&' + id_emp, {responseType: 'json'});
  }

  getEReading(date: string, id_emp: number) {
    return this.http.get(ipserver + 'energy/reading/' + date + '&' + id_emp, {responseType: 'json'});
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

  updateAllPlans(plan: number, plan_pico: number, inicio: Date, fin: Date, id_emp: number) {
    return this.http.put(ipserver + 'energy/updatePlans', {plan: plan, plan_pico: plan_pico, start: inicio, end: fin, id_emp: id_emp});
  }

  deleteERecord(id: number) {
    return this.http.delete(ipserver + 'energy/' + id);
  }
}
