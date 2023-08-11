import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ipserver from '../ipserver';
import { Visitor } from '../models/Visitor';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  constructor(private http: HttpClient) { }

  getVRecords(page: number, id_serv: number) {
    return this.http.get(ipserver + 'visitors/records/' + page + '&' + id_serv, {responseType: 'json'});
  }

  getVRecord(ci: number) {
    return this.http.get(ipserver + 'visitors/one/' + ci, {responseType: 'json'});
  }

  saveVisitor(newVisitor: Visitor) {
    return this.http.post(ipserver + 'visitors', newVisitor);
  }

  delete(id: number) {
    return this.http.delete(ipserver + 'visitors/' + id);
  }
}
