import { Injectable } from '@angular/core';
import { GEE } from '../models/GEE';
import {HttpClient} from '@angular/common/http';
import ipserver from '../ipserver';
import { FCard } from '../models/FCard';

@Injectable({
  providedIn: 'root',
})
export class GeeService {

  constructor(private http: HttpClient) { }

  listGEEs() {
    return this.http.get(ipserver + 'gee/list/', {responseType: 'json'});
  }

  listGEEsByUser(id: number) {
    return this.http.get(ipserver + 'gee/listGEEByUser/' + id, {responseType: 'json'});
  }

  listGEERecords(id: number) {
    return this.http.get(ipserver + 'gee/listGEERecords/' + id, {responseType: 'json'});
  }

  saveGEE(newGEE: GEE) {
    return this.http.post(ipserver + 'gee', newGEE);
  }

  saveFCard(newCard: FCard) {
    return this.http.post(ipserver + 'gee/FCard', newCard);
  }

  updateGEE(newGEE: GEE) {
    return this.http.put(ipserver + 'gee/' + newGEE.id, newGEE);
  }

  deleteGEE(id: number) {
    return this.http.delete(ipserver + 'gee/' + id);
  }
}
