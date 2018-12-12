import { Component, Input, OnInit } from '@angular/core';
import * as CanvasJS from '../top-tracks/canvasjs.min.js';
import { BandService } from '../band-service.service';
import { AlbumService } from '../album.service';
import { AudioFeaturesService } from '../audio-features.service';
import * as moment from 'moment';

@Component({
  selector: 'app-album-analysis',
  templateUrl: './album-analysis.component.html',
  styleUrls: ['./album-analysis.component.css']
})
export class AlbumAnalysisComponent implements OnInit {

  @Input()
  bandId: string;

  albums: any[];

  energyDatapoints: any[] = [];
  danceabilityDatapoints: any[] = [];
  valenceDatapoints: any[] = [];

  constructor(
    private bandService: BandService,
    private albumService: AlbumService,
    private audioFeatures: AudioFeaturesService) { }

  ngOnInit() {

    this.bandService.getAlbums(this.bandId)
      .subscribe((response: any) => {
        this.albums = response.items;
        this.albums
          .filter(album => !album.name.includes('Deluxe'))
          .forEach(album => {
          this.albumService.getTracks(album.id).subscribe((response: any )=> {

            this.audioFeatures.getAudioFeaturesForTracks(response.items.map(track => track.id))
              .subscribe((response: any )=> {

                const energyForAllTracks = response.audio_features.map(audioFeatures => audioFeatures.energy);
                const energyAverage = energyForAllTracks.reduce((a,b) => a + b, 0) / energyForAllTracks.length;
                this.energyDatapoints.push({
                  y: energyAverage,
                  x:  moment(album.release_date, 'YYYY-MM-DD').toDate(),
                  name: album.name,
                  toolTipContent: "{name}: {x}",
                  cursor: "pointer",
                  urlToGo: album.external_urls.spotify,
                  click: this.onDataPointClick
                });

                const danceabilityForAllTracks = response.audio_features.map(audioFeatures => audioFeatures.danceability);
                const danceabilityAverage = danceabilityForAllTracks.reduce((a,b) => a + b, 0) / danceabilityForAllTracks.length;
                this.danceabilityDatapoints.push({
                  y: danceabilityAverage,
                  x:  moment(album.release_date, 'YYYY-MM-DD').toDate(),
                  name: album.name,
                  toolTipContent: "{name}: {x}",
                  cursor: "pointer",
                  urlToGo: album.external_urls.spotify,
                  click: this.onDataPointClick
                });

                const valenceForAllTracks = response.audio_features.map(audioFeatures => audioFeatures.valence);
                const valenceAverage = valenceForAllTracks.reduce((a,b) => a + b, 0) / valenceForAllTracks.length;
                this.valenceDatapoints.push({
                  y: valenceAverage,
                  x:  moment(album.release_date, 'YYYY-MM-DD').toDate(),
                  name: album.name,
                  toolTipContent: "{name}: {x}",
                  cursor: "pointer",
                  urlToGo: album.external_urls.spotify,
                  click: this.onDataPointClick
                });

                let byDate = (last, next) => {
                  if (last.x < next.x) {
                    return -1;
                  }
                  if (last.x > next.x) {
                    return 1;
                  }
                  return 0;
                };

                this.energyDatapoints = this.energyDatapoints.sort(byDate);
                this.danceabilityDatapoints = this.danceabilityDatapoints.sort(byDate);
                this.valenceDatapoints = this.valenceDatapoints.sort(byDate);

                let chart = new CanvasJS.Chart("albumAnalysisChartContainer", {
                  theme: 'dark1',
                  animationDuration: 3000,
                  animationEnabled: true,
                  axisX: {
                    valueFormatString: "MMM YYYY"
                  },
                  axisY: {
                    gridThickness: 0
                  },
                  legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    horizontalAlign: "center",
                    dockInsidePlotArea: true,
                  },
                  data: [{
                    type: "line",
                    name: "energy",
                    showInLegend: true,
                    dataPoints:this.energyDatapoints
                  }, {
                    type: "line",
                    name: "danceability",
                    showInLegend: true,
                    dataPoints:this.danceabilityDatapoints
                  },{
                    type: "line",
                    name: "valence",
                    showInLegend: true,
                    dataPoints:this.valenceDatapoints
                  }
                  ]
                });

                chart.render();
              });
            })
          })
        });



  }

  onDataPointClick(e) {
    window.open(e.dataPoint.urlToGo, "_blank");
  }

}
