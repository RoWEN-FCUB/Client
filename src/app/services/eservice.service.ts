import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EService } from '../models/EService';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class EserviceService {

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get(ipserver + 'service/list', {responseType: 'json'});
  }

  getOne(id: number) {
    return this.http.get(ipserver + 'service/get/' + id, {responseType: 'json'});
  }

  userServices(userid: number) {
    return this.http.get(ipserver + 'service/user_services/' + userid, {responseType: 'json'});
  }

  saveService(newService: EService) {
    return this.http.post(ipserver + 'service', newService);
  }

  updateService(id: number, newService: EService) {
    return this.http.put(ipserver + 'service/' + id, newService);
  }

  deleteService(id: number) {
    return this.http.delete(ipserver + 'service/' + id);
  }
}
