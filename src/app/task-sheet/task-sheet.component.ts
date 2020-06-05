import { Component, OnInit } from '@angular/core';
import * as microsoftTeams from '@microsoft/teams-js';
import {NgxAdalService} from 'ngx-adal-8';
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
  constructor(private authService: NgxAdalService) { }

  ngOnInit(): void {
    microsoftTeams.initialize();
    this.user = this.authService.userInfo.profile.name;
    this.email = this.authService.userInfo.profile.upn;
  }
  on_page_change(event){
    this.page_index = event.pageIndex;
  }
  add_event(){
    this.task.push('task' +this.task.length);
  }
}
