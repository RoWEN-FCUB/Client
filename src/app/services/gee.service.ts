import { Injectable } from '@angular/core';
import { GEE } from '../models/GEE';
import {HttpClient} from '@angular/common/http';
import ipserver from '../ipserver';
import { FCard } from '../models/FCard';
import { CRecord } from '../models/CRecord';

@Injectable({
  providedIn: 'root',
})
export class GeeService {

  constructor(private http: HttpClient) { }

  listGEEs() {
    return this.http.get(ipserver + 'gee/list/', {responseType: 'json'});
  }

  getFuelPrices() {
    return this.http.get(ipserver + 'gee/fuelPrices/', {responseType: 'json'});
  }

  listGEEsByUser(id: number) {
    return this.http.get(ipserver + 'gee/listGEEByUser/' + id, {responseType: 'json'});
  }

  listGEERecords(id: number) {
    return this.http.get(ipserver + 'gee/listGEERecords/' + id, {responseType: 'json'});
  }

  listCardsByGEE(id_gee: number) {
    return this.http.get(ipserver + 'gee/listCardsByGEE/' + id_gee, {responseType: 'json'});
  }

  listTanksByGEE(id_gee: number) {
    return this.http.get(ipserver + 'gee/listTanksByGEE/' + id_gee, {responseType: 'json'});
  }

  listCardsRecords(id_card: number) {
    return this.http.get(ipserver + 'gee/listCardsRecords/' + id_card, {responseType: 'json'});
  }

  saveGEE(newGEE: GEE) {
    return this.http.post(ipserver + 'gee', newGEE);
  }

  saveFCard(newCard: FCard) {
    return this.http.post(ipserver + 'gee/FCard', newCard);
  }

  saveFCardRecord(newCardRecord: CRecord) {
    return this.http.post(ipserver + 'gee/FCardRecord', newCardRecord);
  }

  changeFuelPrice(data: any) {
    return this.http.post(ipserver + 'gee/changeFuelPrice', data);
  }

  updateGEE(newGEE: GEE) {
    return this.http.put(ipserver + 'gee/' + newGEE.id, newGEE);
  }

  deleteGEE(id: number) {
    return this.http.delete(ipserver + 'gee/' + id);
  }

  deleteCardRecord(id: number) {
    return this.http.delete(ipserver + 'gee/deleteCardRecord/' + id);
  }

  deleteFuelCard(id: number) {
    return this.http.delete(ipserver + 'gee/deleteFuelCard/' + id);
  }
}
