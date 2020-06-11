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
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { AddManagerComponent } from './add-manager/add-manager.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxSpinnerModule} from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TaskSheetComponent,
    LoginComponent,
    ConfigComponent,
    AddTaskComponent,
    AddManagerComponent
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
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
