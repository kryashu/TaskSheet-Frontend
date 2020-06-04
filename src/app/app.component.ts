import { Component } from '@angular/core';
import { NgxAdalService } from 'ngx-adal-8';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teams';
  constructor(private authService: NgxAdalService){
    if (!this.authService.isAuthenticated) {
      this.authService.login();
    }
  }
}
