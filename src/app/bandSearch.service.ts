import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BandSearchService {

  clientId: string = 'aeeec6d2a17b46008124e63cda6b9146';
  baseUrl: string = `https://api.spotify.com/v1/search?type=artist&limit=10&client_id=${this.clientId}&q=`;

  constructor(private httpClient: HttpClient) {
  }

  search(queryString: string) {
    const authtoken = localStorage.getItem('authtoken');

      const url = this.baseUrl + queryString;
      return this.httpClient.get(url, {
        headers: {
          'Authorization': `Bearer ${authtoken}`
        }
      });
  }
}
