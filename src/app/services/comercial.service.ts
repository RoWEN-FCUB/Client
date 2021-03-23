import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { Observable, from } from 'rxjs';
import { CProvider } from '../models/CProvider';
import { CProduct } from '../models/CProduct';
import { CReceipt } from '../models/CReceipt';
import ipserver from '../ipserver';
import { CConc } from '../models/CConc';

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

  getReceiptProducts(id_receipt: number) {
    return this.http.get(ipserver + 'comercial/listReceiptProducts/' + id_receipt, {responseType: 'json'});
  }

  getReceipts(id_provd: number, conc: number, del: number) {
    return this.http.get(ipserver + 'comercial/listReceipts/' + id_provd + '&' + conc + '&' + del, {responseType: 'json'});
  }

  getMarkedReceipts(id_provd: number) {
    return this.http.get(ipserver + 'comercial/listMarkedReceipts/' + id_provd, {responseType: 'json'});
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

  createConciliation(newCon: CConc[], datos) {
    const todo = {productos: newCon, datos: datos};
    return this.http.post(ipserver + 'comercial/concic', todo);
  }

  updateProduct(newProduct: CProduct, id: number) {
    return this.http.put(ipserver + 'comercial/product/' + id, newProduct);
  }

  updateProvider(newProvider: CProvider, id: number) {
    return this.http.put(ipserver + 'comercial/provider/' + id, newProvider);
  }

  updateReceipt(newReceipt: CReceipt, id: number) {
    return this.http.put(ipserver + 'comercial/receipt/' + id, newReceipt);
  }

  deleteProduct(id: number) {
    return this.http.delete(ipserver + 'comercial/product/' + id, {responseType: 'json'});
  }

  deleteProvider(id: number) {
    return this.http.delete(ipserver + 'comercial/provider/' + id, {responseType: 'json'});
  }

  deleteReceipt(id: number) {
    return this.http.delete(ipserver + 'comercial/receipt/' + id, {responseType: 'json'});
  }

  uploadFile(file) {
    return this.http.post(ipserver + 'comercial/upload', file);
  }

  searchReceipts(str: string, page: number, id_provider: number, concilied: number, delivered: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(ipserver + 'comercial/searchreceipts/' + str + '&' + page + '&' + id_provider + '&' + concilied + '&' + delivered, {responseType: 'json'});
  }
}
