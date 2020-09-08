import { createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/models/movie.model';
import * as MovieViewerActions from '../actions/movies.actions';
import { MovieDetails } from '../models/movie-details.model';

export const movieDataFeatureKey = 'movieData';

export interface MoviesState {
  movies: Array<Movie>;
  selectedMovieId: number;
  selectedMovie: MovieDetails | null;
  loading: boolean;
  loadingMovie: boolean;
  filter: string;
  apiKey: string;
}

export const initialState: MoviesState = {
  movies: new Array<Movie>(),
  loading: false,
  loadingMovie: false,
  selectedMovieId: 0,
  selectedMovie: null,
  filter: '',
  apiKey: '',
};

export const reducer = createReducer(
  initialState,
  on(MovieViewerActions.getMovies, (state) => ({ ...state, loading: true })),
  on(MovieViewerActions.getMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies: movies,
    loading: false,
  })),
  on(MovieViewerActions.getMoviesFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(MovieViewerActions.getMovieDetails, (state, { movieId }) => ({
    ...state,
    selectedMovieId: movieId,
    selectedMovie: null,
    loadingMovie: true,
  })),
  on(MovieViewerActions.getMovieDetailsSuccess, (state, { movieDetails }) => ({
    ...state,
    selectedMovie: movieDetails,
    loadingMovie: false,
  })),
  on(MovieViewerActions.getMovieDetailsFailure, (state) => ({
    ...state,
    loadingMovie: false,
  })),
  on(MovieViewerActions.searchMovies, (state, { searchText }) => ({
    ...state,
    filter: searchText,
  })),
  on(MovieViewerActions.setApiKey, (state, { apiKey }) => ({
    ...state,
    apiKey,
  }))
);
