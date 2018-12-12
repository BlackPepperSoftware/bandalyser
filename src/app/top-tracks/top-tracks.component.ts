import { Component, OnInit } from '@angular/core';
import { BandService } from '../band-service.service';
import { ActivatedRoute } from '@angular/router';
import { TopTrackService } from '../top-track-service.service';
import { AudioFeaturesService } from '../audio-features.service';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {
  bandName: string;
  bandId: string;
  bandImageLink: string;
  topTracks: any[] = [];

  constructor(private bandService: BandService,
              private route: ActivatedRoute,
              private topTracksService: TopTrackService,
              private audioFeaturesService: AudioFeaturesService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.bandId = params['bandid'];
      this.bandService.getBand(this.bandId).subscribe(result => {
        this.bandName = result['name'];
        this.bandImageLink = result.images['0'].url;

        this.topTracksService.getTopTracks(this.bandId)
          .subscribe(results => {
            this.topTracks = results['tracks'];
            this.audioFeaturesService.getAudioFeaturesForTracks(this.topTracks.map(track => track['id']))
              .subscribe(results => {
                this.topTracks = this.topTracks
                  .map(track => {
                    const trackAudioFeatures = results['audio_features'].find((audio) => audio.id === track.id);
                    return {...trackAudioFeatures, ...track}
                  }).sort((last, next) => {
                    if (last.album.release_date < next.album.release_date) {
                      return -1;
                    }
                    if (last.album.release_date > next.album.release_date) {
                      return 1;
                    }

                    // names must be equal
                    return 0;
                  })
              })
          });
      });
    });

  }

}
