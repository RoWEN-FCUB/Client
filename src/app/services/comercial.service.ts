import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { Observable, from } from 'rxjs';
// import { CProvider } from '../models/CProvider';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class ComercialService {

  constructor(private http: HttpClient) { }

  getProviders(id_emp: number) {
    return this.http.get(ipserver + 'comercial/listProviders/' + id_emp, {responseType: 'json'});
  }

  getProducts(id_prod: number) {
    return this.http.get(ipserver + 'comercial/listProducts/' + id_prod, {responseType: 'json'});
  }

  getReceipts(id_provd: number, conc: number, del: number) {
    return this.http.get(ipserver + 'comercial/listReceipts/' + id_provd + '&' + conc + '&' + del, {responseType: 'json'});
  }
}
