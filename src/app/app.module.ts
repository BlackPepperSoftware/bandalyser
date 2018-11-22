import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule,
  MatInputModule
} from '@angular/material';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BandSearchService } from './bandSearch.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthTokenService } from './auth-token.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthTokenService, BandSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
