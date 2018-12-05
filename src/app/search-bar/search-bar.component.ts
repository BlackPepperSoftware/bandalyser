import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BandSearchService } from '../bandSearch.service';
import { debounceTime, defaultIfEmpty, distinctUntilChanged, filter, switchMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  results: any[] = [];

  queryField: FormControl = new FormControl();

  constructor(private bandSearchService: BandSearchService) {
  }

  ngOnInit() {
    this.queryField.valueChanges
      //.pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
      .pipe(filter(query => query))
      .pipe(switchMap((query) => this.bandSearchService.search(query)))
      .subscribe(response => this.results = (response as any).artists.items)
  }

}
