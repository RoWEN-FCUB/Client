import { Injectable } from '@angular/core';
import { GEE } from '../models/GEE';
import {HttpClient} from '@angular/common/http';
import ipserver from '../ipserver';
import { FCard } from '../models/FCard';
import { CRecord } from '../models/CRecord';
import { GRecord } from '../models/GRecord';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeeService {

  constructor(private http: HttpClient) { }

  listGEEs() {
    return this.http.get(ipserver + 'gee/list/', {responseType: 'json'});
  }

  getFuelTypes() {
    return this.http.get(ipserver + 'gee/fuelTypes/', {responseType: 'json'});
  }

  listGEEsByUser(id: number) {
    return this.http.get(ipserver + 'gee/listGEEByUser/' + id, {responseType: 'json'});
  }

  async listGEERecords(id: number, page: number, limit: number) {
    return await firstValueFrom(this.http.get(ipserver + 'gee/listGEERecords/' + id + '&' + page + '&' + limit, {responseType: 'json'}));
  }

  /*
  getGEEFuelExistence(id: number) {
    return this.http.get(ipserver + 'gee/getTotalExistence/' + id, {responseType: 'json'});
  }*/

  async listCardsByGEE(id_gee: number) {
    return await firstValueFrom(this.http.get(ipserver + 'gee/listCardsByGEE/' + id_gee, {responseType: 'json'}));
  }

  async listTanksByGEE(id_gee: number, page: number, limit: number) {
    return await firstValueFrom(this.http.get(ipserver + 'gee/listTanksByGEE/' + id_gee + '&' + page + '&' + limit, {responseType: 'json'}));
  }

  async listCardsRecords(id_card: number, page: number, limit: number) {
    return await firstValueFrom(this.http.get(ipserver + 'gee/listCardsRecords/' + id_card + '&' + page + '&' + limit, {responseType: 'json'}));
  }

  saveGEE(newGEE: GEE) {
    return this.http.post(ipserver + 'gee', newGEE);
  }

  saveGEERecord(newGEERecord: GRecord[]) {
    return this.http.post(ipserver + 'gee/GRecord', newGEERecord);
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

  deleteGEERecord(id: number) {
    return this.http.delete(ipserver + 'gee/deleteGEERecord/' + id);
  }

  deleteCardRecord(id: number) {
    return this.http.delete(ipserver + 'gee/deleteCardRecord/' + id);
  }

  deleteFuelCard(id: number) {
    return this.http.delete(ipserver + 'gee/deleteFuelCard/' + id);
  }
}
