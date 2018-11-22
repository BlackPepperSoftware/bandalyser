import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from './auth-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Bandalyser';

  constructor(private authTokenService: AuthTokenService) {

  }

  ngOnInit(): void {
    this.authTokenService.getAuthToken();
  }

}
