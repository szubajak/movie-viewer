import { Component, OnInit } from '@angular/core';
import { MovieDetails } from '../models/movie-details.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie$: Observable<MovieDetails> = this.store.select(
    (state) => state.moviesState.selectedMovie
  );

  loading$: Observable<boolean> = this.store.select(
    (state) => state.moviesState.loadingMovie
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  getPoster(poster_path: string) {
    return `http://image.tmdb.org/t/p/w185${poster_path}`;
  }
}
