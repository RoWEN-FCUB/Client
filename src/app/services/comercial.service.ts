import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { Observable, from } from 'rxjs';
import { CProvider } from '../models/CProvider';
import { CProduct } from '../models/CProduct';
import { CReceipt } from '../models/CReceipt';
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

  createProduct(newProduct: CProduct) {
    return this.http.post(ipserver + 'comercial/product', newProduct);
  }

  createProvider(newProvider: CProvider) {
    return this.http.post(ipserver + 'comercial/provider', newProvider);
  }

  createReceipt(newReceipt: CReceipt) {
    return this.http.post(ipserver + 'comercial/receipt', newReceipt);
  }

  updateProduct(newProduct: CProduct, id: number) {
    return this.http.put(ipserver + 'comercial/product/' + id, newProduct);
  }

  updateProvider(newProvider: CProvider, id: number) {
    return this.http.put(ipserver + 'comercial/provider/' + id, newProvider);
  }

  deleteProduct(id: number) {
    return this.http.delete(ipserver + 'comercial/product/' + id, {responseType: 'json'});
  }

  deleteProvider(id: number) {
    return this.http.delete(ipserver + 'comercial/provider/' + id, {responseType: 'json'});
  }

  uploadFile(file) {
    return this.http.post(ipserver + 'comercial/upload', file);
  }
}
