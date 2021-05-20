import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    // return this.http.get(encodeURI(weatherApi + '&q=' + city + ', CU'), {responseType: 'json'});
    // tslint:disable-next-line: max-line-length
    // return this.http.get(weatherApi + '&id=3550595', {responseType: 'json', headers : new HttpHeaders({ 'Content-Type': 'text/plain' })});
    return this.http.get(ipserver + 'weather/' + city, {responseType: 'json'});
  }
}
