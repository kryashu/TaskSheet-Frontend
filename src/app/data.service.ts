import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
url = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  add_user(data){
    return this.http.post(this.url + 'create_user', data);
  }
  add_task(data){
    return this.http.post(this.url + 'add_task', data);
  }
}
