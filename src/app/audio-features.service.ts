import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioFeaturesService {

  constructor(private httpClient: HttpClient) {
  }

  getAudioFeaturesForTracks(tracks: any[]) {
    const authtoken = localStorage.getItem('authtoken');
    const url = `https://api.spotify.com/v1/audio-features?ids=${tracks.join()}`;
    return this.httpClient.get(url, {
      headers: {
        'Authorization': `Bearer ${authtoken}`
      }
    });
  }
}
