import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root'
})
export class DeliverService {

  constructor(private http: HttpClient) { }

  getDeliver(code: string) {
    return this.http.get(ipserver + 'deliver/' + code, {responseType: 'json'});
  }
}
