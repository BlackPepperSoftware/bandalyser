import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private httpClient: HttpClient) {
  }

  getTracks(albumId: string) {
    const authtoken = localStorage.getItem('authtoken');
    const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
    return this.httpClient.get(url, {
      headers: {
        'Authorization': `Bearer ${authtoken}`
      }
    });
  }
}
