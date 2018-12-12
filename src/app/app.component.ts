import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from './auth-token.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {

  title = 'Bandalyser';

  constructor(private authTokenService: AuthTokenService) {

  }

  ngOnInit(): void {
    this.authTokenService.getAuthToken();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
  }


}
