import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, from } from 'rxjs';
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
}
