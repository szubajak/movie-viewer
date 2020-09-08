import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { getMovies, getMovieDetails } from './../actions/movies.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Array<Movie>> = this.store.select((state) => {
    let movies = state.moviesState.movies.filter((movie) =>
      movie.title.toLowerCase().includes(state.moviesState.filter.toLowerCase())
    );
    return movies;
  });

  loading$: Observable<boolean> = this.store.select(
    (state) => state.moviesState.loading
  );

  apiKey$: Observable<string> = this.store.select(
    (state) => state.moviesState.apiKey
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getMovies());
  }

  selectMovie(movieId: number) {
    this.store.dispatch(getMovieDetails({ movieId }));
  }
}
