import { Component, OnInit } from '@angular/core';
import * as microsoftTeams from '@microsoft/teams-js';
import {NgxAdalService} from 'ngx-adal-8';
import {DataService} from '../data.service';
import {MatDialog} from '@angular/material/dialog';
import {AddTaskComponent} from '../add-task/add-task.component';
import {AddManagerComponent} from '../add-manager/add-manager.component';
import { NgxSpinnerService} from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-sheet',
  templateUrl: './task-sheet.component.html',
  styleUrls: ['./task-sheet.component.css']
})
export class TaskSheetComponent implements OnInit {
days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// tslint:disable-next-line:variable-name
task_list = [];
// tslint:disable-next-line:variable-name
associate_list = [];
// tslint:disable-next-line:variable-name
associate_email;
// tslint:disable-next-line:variable-name
associate_flag = false;
date = new Date();
length;
weekday;
user;
email;
// tslint:disable-next-line:variable-name
page_index = 0;
  // tslint:disable-next-line:max-line-length
  constructor(private authService: NgxAdalService, private dataService: DataService, public dialog: MatDialog,  private SpinnerService: NgxSpinnerService, private toaster: ToastrService) { }

  ngOnInit(): void {
    microsoftTeams.initialize();
    this.add_user();
  }
  show_error(message){
    this.toaster.error(message);
  }
  set_user_details(){
  this.get_task();
  this.associate_email = '';
  this.associate_flag = false;
  }
  add_user(){
    this.SpinnerService.show();
    this.user = this.authService.userInfo.profile.name;
    this.email = this.authService.userInfo.profile.upn;
    const data = {name: this.user, email: this.email, token: this.authService.accessToken};
    this.dataService.add_user(data).subscribe(reply => {
      // @ts-ignore
      localStorage.setItem('token', 'bearer ' + reply.data.access_token);
      this.get_task();
      this.getAssociate();
      this.SpinnerService.hide();
    }, error => {
      console.log(error);
    });
  }
  show_associate(){
    this.associate_flag = true;
    this.SpinnerService.show();
    // tslint:disable-next-line:variable-name
    const selected_date = this.date.getFullYear() + '-' + (this.date.getMonth() >= 10 ? (this.date.getMonth() + 1) : '0' + (this.date.getMonth() + 1)) + '-' + (this.date.getDate() >= 10 ? this.date.getDate() : '0' + this.date.getDate());
    this.dataService.get_associate_task(this.associate_email, selected_date ).subscribe(reply => {
      // @ts-ignore
      this.task_list = reply.data.data;
      this.SpinnerService.hide();
    });
  }

  next(){
    const next = new Date(this.date);
    next.setDate(this.date.getDate() + 1);
    this.date = next;
    this.get_task();
  }
  previous(){
    const next = new Date(this.date);
    next.setDate(this.date.getDate() - 1);
    this.date = next;
    this.get_task();
  }
  get_task(){
    if (!this.associate_flag){
    this.SpinnerService.show();
    // tslint:disable-next-line:max-line-length variable-name
    const selected_date = this.date.getFullYear() + '-' + (this.date.getMonth() >= 10 ? (this.date.getMonth() + 1) : '0' + (this.date.getMonth() + 1)) + '-' + (this.date.getDate() >= 10 ? this.date.getDate() : '0' + this.date.getDate());
    this.weekday = this.date.getDay();
    this.dataService.get_task(selected_date).subscribe(reply => {
      // @ts-ignore
      this.task_list = reply.data.data;
      // @ts-ignore
      this.length = reply.data.length;
      this.SpinnerService.hide();
    }, error => {
      this.SpinnerService.hide();
      this.show_error(error.message);
      if (error.message === 'No Task Found'){
       this.task_list = [];
      }
    });
    }
    else{
      this.show_associate();
    }
  }

  // tslint:disable-next-line:variable-name
  end_task(task_id, created_by){
    this.SpinnerService.show();
    this.dataService.end_task(task_id).subscribe(reply => {
      this.get_task();
      this.SpinnerService.hide();
    }, error => {
      this.SpinnerService.hide();
      this.show_error(error.message);
    });
  }

  openTaskDialog(){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '250px',
      data: { name: this.user, email: this.email}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dataService.add_task(result).subscribe(reply => {
          this.date = new Date();
          this.get_task();
        }, error => {
          this.show_error(error.message);
        });
      }
    });
  }

  getAssociate(){
    this.dataService.get_associate().subscribe(reply => {
      // @ts-ignore
      this.associate_list = reply.data.data;
    }, error => {
      this.show_error(error.message);
    });
  }

 openManagerDialog(){
   // tslint:disable-next-line:variable-name
   let user_list = [];
   this.SpinnerService.show();
   this.dataService.get_all_user().subscribe(reply => {
     // @ts-ignore
     user_list = reply.data.data;
     this.SpinnerService.hide();
     const dialogRef = this.dialog.open(AddManagerComponent, {
       width: '250px',
       data: {list: user_list}
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result){
         this.dataService.add_manager(result.selected_user).subscribe(reply => {
           // @ts-ignore
           this.toaster.success(reply.message);
         }, error => {
           this.show_error(error.message);
         });
       }
     });
    });
 }
}
