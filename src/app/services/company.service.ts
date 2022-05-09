import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Company } from '../models/Company';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get(ipserver + 'company/list', {responseType: 'json'});
  }

  getOne(id: number) {
    return this.http.get(ipserver + 'company/get/' + id, {responseType: 'json'});
  }

  saveCompany(newCompany: Company) {
    return this.http.post(ipserver + 'company', newCompany);
  }

  updateCompany(id: number, newCompany: Company) {
    return this.http.put(ipserver + 'company/' + id, newCompany);
  }

  deleteCompany(id: number) {
    return this.http.delete(ipserver + 'company/' + id);
  }
}
