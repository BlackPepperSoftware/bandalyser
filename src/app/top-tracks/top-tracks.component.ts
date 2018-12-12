import { Component, OnInit } from '@angular/core';
import { BandService } from '../band-service.service';
import { ActivatedRoute } from '@angular/router';
import { TopTrackService } from '../top-track-service.service';
import { AudioFeaturesService } from '../audio-features.service';
import * as CanvasJS from './canvasjs.min.js';
import * as moment from 'moment';

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
  danceabilityDataPoints: any[] =[];
  speechinessDataPoints: any[] =[];
  valenceDataPoints: any[] =[];

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
            this.audioFeaturesService.getAudioFeaturesForTracks(this.topTracks
              .map(track => track['id']))
              .subscribe(results => {
                this.topTracks = this.topTracks
                  .map(track => {
                    const trackAudioFeatures = results['audio_features'].find((audio) => audio.id === track.id);
                    return {...trackAudioFeatures, ...track, date: moment(track.album.release_date, 'YYYY-MM-DD').toDate() }
                  }).sort((last, next) => {
                    if (last.album.release_date < next.album.release_date) {
                      return -1;
                    }
                    if (last.album.release_date > next.album.release_date) {
                      return 1;
                    }
                    return 0;
                  });

                this.danceabilityDataPoints = this.topTracks.map(track => {return {x: track.date, y : track.danceability, name: track.name, toolTipContent: "{name}: {x}", cursor: "pointer"}})
                this.speechinessDataPoints = this.topTracks.map(track => {return {x: track.date, y : track.speechiness, name: track.name, toolTipContent: "{name}: {x}", cursor: "pointer"}})
                this.valenceDataPoints = this.topTracks.map(track => {return {x: track.date, y : track.valence, name: track.name, toolTipContent: "{name}: {x}", cursor: "pointer"}})

                let chart = new CanvasJS.Chart("chartContainer", {
                  theme: 'dark1',
                  animationDuration: 3000,
                  animationEnabled: true,
                  axisX: {
                    valueFormatString: "MMM YYYY"
                  },
                  legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    horizontalAlign: "center",
                    dockInsidePlotArea: true,
                  },
                  data: [{
                    type: "line",
                    name: "danceability",
                    showInLegend: true,
                    dataPoints: this.danceabilityDataPoints
                  },{
                    type: "line",
                    name: "speechiness",
                    showInLegend: true,
                    dataPoints: this.speechinessDataPoints
                  },
                    {
                      type: "line",
                      name: "valence",
                      showInLegend: true,
                      dataPoints: this.valenceDataPoints
                    }
                  ]
                });

                chart.render();

              })
          });
      });
    });

  }

}
