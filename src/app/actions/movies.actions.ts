import { Movie } from '../models/movie.model';
import { MovieDetails } from '../models/movie-details.model';
import { createAction, props } from '@ngrx/store';

export enum MoviesActionTypes {
  GET_MOVIES = '[ Movies ] Get Movies',
  GET_MOVIES_SUCCESS = '[ Movies ] Get Movies Success',
  GET_MOVIES_FAILURE = '[ Movies ] Get Movies Failure',
  GET_MOVIE_DETAILS = '[ Movies ] Get Movie Details',
  GET_MOVIE_DETAILS_SUCCESS = '[ Movies ] Get Movie Details Success',
  GET_MOVIE_DETAILS_FAILURE = '[ Movies ] Get Movie Details Failure',
  SEARCH_MOVIES = '[ Movies ] Search Movies',
  SET_API_KEY = '[ Movies ] Set Api Key',
}

export const getMovies = createAction(MoviesActionTypes.GET_MOVIES);

export const getMoviesSuccess = createAction(
  MoviesActionTypes.GET_MOVIES_SUCCESS,
  props<{ movies: Array<Movie> }>()
);

export const getMoviesFailure = createAction(
  MoviesActionTypes.GET_MOVIES_FAILURE,
  props<{ error: any }>()
);

export const getMovieDetails = createAction(
  MoviesActionTypes.GET_MOVIE_DETAILS,
  props<{ movieId: number }>()
);

export const getMovieDetailsSuccess = createAction(
  MoviesActionTypes.GET_MOVIE_DETAILS_SUCCESS,
  props<{ movieDetails: MovieDetails }>()
);

export const getMovieDetailsFailure = createAction(
  MoviesActionTypes.GET_MOVIE_DETAILS_FAILURE,
  props<{ error: any }>()
);

export const searchMovies = createAction(
  MoviesActionTypes.SEARCH_MOVIES,
  props<{ searchText: string }>()
);

export const setApiKey = createAction(
  MoviesActionTypes.SET_API_KEY,
  props<{ apiKey: string }>()
);
