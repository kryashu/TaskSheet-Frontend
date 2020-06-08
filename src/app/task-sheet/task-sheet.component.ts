import { Component, OnInit } from '@angular/core';
import * as microsoftTeams from '@microsoft/teams-js';
import {NgxAdalService} from 'ngx-adal-8';
import {DataService} from '../data.service';
@Component({
  selector: 'app-task-sheet',
  templateUrl: './task-sheet.component.html',
  styleUrls: ['./task-sheet.component.css']
})
export class TaskSheetComponent implements OnInit {
days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
task = ['task'];
user;
email;
page_index = 0;
  constructor(private authService: NgxAdalService, private dataService: DataService) { }

  ngOnInit(): void {
    microsoftTeams.initialize();
    this.add_user();
  }
  add_user(){
    this.user = this.authService.userInfo.profile.name;
    this.email = this.authService.userInfo.profile.upn;
    const data = {name: this.user, email: this.email};
    this.dataService.add_user(data).subscribe(reply =>{
      console.log(reply);
    }, error => {
      console.log(error);
    });
  }
  on_page_change(event){
    this.page_index = event.pageIndex;
  }
  add_event(){
    this.task.push('task' +this.task.length);
  }
}
