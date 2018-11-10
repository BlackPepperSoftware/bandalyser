import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BandSearchService } from '../bandSearch.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  results: any[] = [];

  queryField: FormControl = new FormControl();

  constructor(private bandSearchService: BandSearchService) { }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe(query =>
        this.bandSearchService.search(query)
          .subscribe(response => this.results = (response as any).artists.items))
  }

}
