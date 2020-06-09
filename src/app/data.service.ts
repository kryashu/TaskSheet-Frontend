import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
url = 'https://tasksheet-symb.herokuapp.com/';
  constructor(private http: HttpClient) { }

  add_user(data){
    return this.http.post(this.url + 'create_user', data);
  }
  add_task(data){
    return this.http.post(this.url + 'add_task', data);
  }
  get_task(email){
    return this.http.post(this.url + 'get_all', {created_by: email});
  }
  // tslint:disable-next-line:variable-name
  end_task(id, created_by){
    return this.http.post(this.url + 'end_task', {task_id: id, email: created_by});
  }
}
