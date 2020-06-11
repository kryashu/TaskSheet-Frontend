import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
url = 'https://tasksheet-symb.herokuapp.com/';
// url = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  add_user(data){
    return this.http.post(this.url + 'create_user', data);
  }
  add_task(data){
    return this.http.post(this.url + 'add_task', data);
  }
  get_task(email, date){
    return this.http.post(this.url + 'get_all', {created_by: email, selected_date: date});
  }
  // tslint:disable-next-line:variable-name
  end_task(id, created_by){
    return this.http.post(this.url + 'end_task', {task_id: id, email: created_by});
  }
  add_manager(user, manager){
    return this.http.post(this.url + 'add_manager', {user_email: user, manager_email: manager});
  }
  get_all_user(){
    return this.http.post(this.url + 'get_all_users', {});
  }
  get_associate(user){
    return this.http.post(this.url + 'get_associate', {user_email: user});
  }
}
