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
    return this.http.get(ipserver + 'energy/' + year + '&' + month, {responseType: 'json'});
  }

  getEReading(date: string) {
    return this.http.get(ipserver + 'energy/reading/' + date, {responseType: 'json'});
  }

  saveERecord(newrecord: ERecord) {
    return this.http.post(ipserver + 'energy', newrecord);
  }
}
