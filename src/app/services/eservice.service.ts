import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EService } from '../models/EService';
import ipserver from '../ipserver';
import { Department } from '../models/Department';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {

  constructor(private http: HttpClient) { }

  getServices(id_emp: number) {
    return this.http.get(ipserver + 'service/list/' + id_emp, {responseType: 'json'});
  }

  getOne(id: number) {
    return this.http.get(ipserver + 'service/get/' + id, {responseType: 'json'});
  }

  getDeparments(id_serv: number) {
    return this.http.get(ipserver + 'service/departments/' + id_serv, {responseType: 'json'});
  }

  getGeo(city: string) {
    return this.http.get(ipserver + 'service/geo/' + city, {responseType: 'json'});
  }

  userServices(userid: number) {
    return this.http.get(ipserver + 'service/user_services/' + userid, {responseType: 'json'});
  }

  updateUserServices(userid: number, services: any) {
    return this.http.put(ipserver + 'service/user_services/' + userid, services);
  }

  saveService(newService: EService) {
    return this.http.post(ipserver + 'service', newService);
  }

  saveDeparments(newDeparment: Department) {
    return this.http.post(ipserver + 'service/department', newDeparment);
  }

  updateService(id: number, newService: EService) {
    return this.http.put(ipserver + 'service/' + id, newService);
  }

  deleteService(id: number) {
    return this.http.delete(ipserver + 'service/' + id);
  }

  deleteDeparment(id: number) {
    return this.http.delete(ipserver + 'service/department/' + id);
  }
}
