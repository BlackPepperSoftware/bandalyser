import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor(private httpClient: HttpClient) {
  }

  getAuthToken() {
    this.httpClient.get('http://localhost:8000/api/authtoken')
      .toPromise().then((body) => {
      const authtoken = body['authtoken'];
      console.log('our auth token', authtoken);
      localStorage.setItem('authtoken', authtoken);
    });
  }
}
