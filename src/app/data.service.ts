import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
url = 'https://tasksheet-symb.herokuapp.com/';
//url = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  add_user(data){
    return this.http.post(this.url + 'create_user', data);
  }
  add_task(data){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') });
    return this.http.post(this.url + 'add_task', data, {headers});
  }
  get_task(date){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') });
    return this.http.post(this.url + 'get_all', {selected_date: date}, {headers});
  }
  // tslint:disable-next-line:variable-name
  end_task(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') });
    return this.http.post(this.url + 'end_task', {task_id: id}, {headers});
  }
  add_manager(manager){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') });

    return this.http.post(this.url + 'add_manager', {manager_email: manager}, {headers});
  }
  get_all_user(){
    return this.http.post(this.url + 'get_all_users', {});
  }
  get_associate(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') });
    return this.http.post(this.url + 'get_associate', {}, {headers});
  }
  get_associate_task(email, date){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') });
    return this.http.post(this.url + 'get_associate_task', {associate_email: email, selected_date: date}, {headers});
  }
}
