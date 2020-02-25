import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';
import ipserver from '../ipserver';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTaskofDay(id: number, day: string) {
    const onlydate = day.split(' '); // separa la fecha de la hora
    return this.http.get(ipserver + 'task/taskofday/' + id + '&' + onlydate[0], {responseType: 'json'});
  }

  getTasksinRange(id: number, dia_inicio: string, dia_fin: string) {
    const sday = dia_inicio.split(' '); // separa la fecha de la hora
    const eday = dia_fin.split(' '); // separa la fecha de la hora
    return this.http.get(ipserver + 'task/tasksinrange/' + id + '&' + sday[0] + '&' + eday[0], {responseType: 'json'});
  }

  countTaskbyState(id: number, day: string, state: string) {
    const onlydate = day.split(' '); // separa la fecha de la hora
    return this.http.get(ipserver + 'task/count/' + id + '&' + onlydate[0] + '&' + state, {responseType: 'json'});
  }

  saveTask(task) {
    return this.http.post(ipserver + 'task', task);
  }

  copyTask(data) {
    return this.http.post(ipserver + 'task/copy', data);
  }

  saveObserv(obs: any) {
    return this.http.post(ipserver + 'task/obs', obs);
  }

  updateTask(id: number, updatedTask: Task): Observable<Task> {
    delete updatedTask.observaciones;
    return this.http.put(ipserver + 'task/' + id, updatedTask);
  }
}

