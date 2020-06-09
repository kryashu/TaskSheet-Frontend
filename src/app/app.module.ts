import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { RegisterComponent } from './register/register.component';
import { TaskSheetComponent } from './task-sheet/task-sheet.component';
import { AppRoutingModule } from './app-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { NgxAdalModule } from 'ngx-adal-8';
import { ConfigComponent } from './config/config.component';
import { AddTaskComponent } from './add-task/add-task.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TaskSheetComponent,
    LoginComponent,
    ConfigComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
    MatPaginatorModule,
    NgxAdalModule.forRoot({
      tenant: '30a7413a-196c-467e-aeff-e00fd7c6df6b',
      clientId: '553cc67e-03c7-4071-ae58-fdac604c5006',
      redirectUri: `frameRedirect.html`,
      postLogoutRedirectUri: `frameRedirect.html`,
      cacheLocation: 'localStorage'
    }),
    MatDialogModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
