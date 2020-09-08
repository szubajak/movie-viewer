import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  searchMovies,
  setApiKey,
  getMovies,
} from './../actions/movies.actions';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent implements OnInit {
  value: string = '';
  apiKey: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  search() {
    this.store.dispatch(searchMovies({ searchText: this.value }));
  }

  clear() {
    this.value = '';
    this.store.dispatch(searchMovies({ searchText: this.value }));
  }

  onKeyChange() {
    this.store.dispatch(setApiKey({ apiKey: this.apiKey }));
    this.store.dispatch(getMovies());
    this.store.dispatch(searchMovies({ searchText: this.value }));
  }

  clearApiKey() {
    this.apiKey = '';
    this.store.dispatch(setApiKey({ apiKey: this.apiKey }));
  }
}
