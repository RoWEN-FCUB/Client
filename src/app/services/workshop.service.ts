import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { WRecord } from '../models/WRecord';
import ipserver from '../ipserver';
import { WPart } from '../models/WPart';
import { WPerson } from '../models/WPerson';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  getWRecords(page: number, id_emp: number) {
    return this.http.get(ipserver + 'workshop/records/' + page + '&' + id_emp, {responseType: 'json'});
  }

  getWParts(id_reg: number) {
    return this.http.get(ipserver + 'workshop/parts/' + id_reg, {responseType: 'json'});
  }

  getWPartMarcs(part: string) {
    return this.http.get(ipserver + 'workshop/partmarcs/' + part, {responseType: 'json'});
  }

  getWPartCaps(part: string) {
    return this.http.get(ipserver + 'workshop/partcaps/' + part, {responseType: 'json'});
  }

  getWPartModels(part: string, marc: string) {
    return this.http.get(ipserver + 'workshop/partmodels/' + part + '&' + marc, {responseType: 'json'});
  }

  getWClients() {
    return this.http.get(ipserver + 'workshop/clients', {responseType: 'json'});
  }

  getWAllParts() {
    return this.http.get(ipserver + 'workshop/allparts', {responseType: 'json'});
  }

  getWDevices() {
    return this.http.get(ipserver + 'workshop/devices', {responseType: 'json'});
  }

  getWMarcs(equipo: string) {
    return this.http.get(ipserver + 'workshop/marcs/' + equipo, {responseType: 'json'});
  }

  getWModels(equipo: string, marca: string) {
    return this.http.get(ipserver + 'workshop/models/' + equipo + '&' + marca, {responseType: 'json'});
  }

  getWSerials(equipo: string, marca: string, modelo: string) {
    return this.http.get(ipserver + 'workshop/serials/' + equipo + '&' + marca + '&' + modelo, {responseType: 'json'});
  }

  getWNames(id_cliente: number) {
    return this.http.get(ipserver + 'workshop/names/' + id_cliente, {responseType: 'json'});
  }

  getWPerson(name: string) {
    return this.http.get(ipserver + 'workshop/listperson/' + name, {responseType: 'json'});
  }

  saveRecord(record: WRecord) {
    return this.http.post(ipserver + 'workshop', record);
  }

  savePerson(record: WPerson) {
    return this.http.post(ipserver + 'workshop/createwperson', record);
  }

  updateRecord(id: number, record: WRecord) {
    return this.http.put(ipserver + 'workshop/' + id, record);
  }

  updateParts(records: WPart[]) {
    return this.http.post(ipserver + 'workshop/updateparts', records);
  }

  searchRecord(strtofind: string, page: number, id_emp: number) {
    return this.http.get(ipserver + 'workshop/search/' + strtofind + '&' + page + '&' + id_emp);
  }

  delete(id: number) {
    return this.http.delete(ipserver + 'workshop/' + id);
  }

  deletePart(id: number) {
    return this.http.delete(ipserver + 'workshop/parts/' + id);
  }

  deleteWDevice(wdev: string) {
    return this.http.delete(ipserver + 'workshop/wdevice/' + wdev);
  }

  deleteWClient(id: number) {
    return this.http.delete(ipserver + 'workshop/wclient/' + id);
  }
}
