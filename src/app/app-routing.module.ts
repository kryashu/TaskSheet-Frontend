import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {TaskSheetComponent} from './task-sheet/task-sheet.component';
import {NgxAdalGuard} from 'ngx-adal-8';

const routes: Routes = [
  { path: '', redirectTo: '/task_sheet', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'task_sheet', component: TaskSheetComponent, canActivate: [NgxAdalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
