import { Component, OnInit } from '@angular/core';
import * as microsoftTeams from '@microsoft/teams-js';
import {NgxAdalService} from 'ngx-adal-8';
import {DataService} from '../data.service';
import {MatDialog} from '@angular/material/dialog';
import {AddTaskComponent} from '../add-task/add-task.component';

@Component({
  selector: 'app-task-sheet',
  templateUrl: './task-sheet.component.html',
  styleUrls: ['./task-sheet.component.css']
})
export class TaskSheetComponent implements OnInit {
days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
task_list = [];
date = new Date();
length;
user;
email;
page_index = 0;
  constructor(private authService: NgxAdalService, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    microsoftTeams.initialize();
    this.add_user();
    this.get_task();
  }

  add_user(){
    this.user = this.authService.userInfo.profile.name;
    this.email = this.authService.userInfo.profile.upn;
    const data = {name: this.user, email: this.email};
    this.dataService.add_user(data).subscribe(reply => {
      console.log(reply);
    }, error => {
      console.log(error);
    });
  }

  on_page_change(event){
    this.page_index = event.pageIndex;
  }

  get_task(){
    // tslint:disable-next-line:max-line-length
    const selected_date = this.date.getFullYear() + '-' + (this.date.getMonth() >= 10 ? (this.date.getMonth()+1) : '0' + (this.date.getMonth()+1)) + '-' + (this.date.getDate() >= 10 ? this.date.getDate() : '0' + this.date.getDate());
    this.dataService.get_task(this.email, selected_date).subscribe(reply => {
      console.log(reply);
      // @ts-ignore
      this.task_list = reply.data.data;
      // @ts-ignore
      this.length = reply.data.length;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:variable-name
  end_task(task_id, created_by){
    this.dataService.end_task(task_id, created_by).subscribe(reply => {
      this.get_task();
    }, error => {
      console.log(error);
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '250px',
      data: { name: this.user, email: this.email}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        this.dataService.add_task(result).subscribe(reply => {
          this.get_task();
        }, error => {
          console.log(error);
        });
      }
    });
  }

}
