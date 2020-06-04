import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { RegisterComponent } from './register/register.component';
import { TaskSheetComponent } from './task-sheet/task-sheet.component';
import { AppRoutingModule } from './app-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { NgxAdalModule } from 'ngx-adal-8';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TaskSheetComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
