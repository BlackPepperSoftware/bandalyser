import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopTrackService {

  constructor(private httpClient: HttpClient) {
  }

  getTopTracks(bandId: string) {
    const authtoken = localStorage.getItem('authtoken');
    const url = `https://api.spotify.com/v1/artists/${bandId}/top-tracks?country=GB`;
    return this.httpClient.get(url, {
      headers: {
        'Authorization': `Bearer ${authtoken}`
      }
    });
  }
}
