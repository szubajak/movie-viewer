import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin, Subject } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { MoviesService } from '../services/movies.service';
import {
  MoviesActionTypes,
  getMoviesSuccess,
  getMovieDetailsSuccess,
  getMoviesFailure,
  getMovieDetails,
  getMovieDetailsFailure,
} from '../actions/movies.actions';
import { Movie } from '../models/movie.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class MoviesEffects {
  loadAllMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActionTypes.GET_MOVIES),
      withLatestFrom(this.store.select((state) => state.moviesState.apiKey)),
      mergeMap(([_, apiKey]) => {
        if (!apiKey) {
          let error = 'Api Key is needed!';
          this.matSnackBar.open(error, 'X', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          return of(getMoviesFailure({ error }));
        }

        const sub = new Subject<
          | ReturnType<typeof getMoviesSuccess>
          | ReturnType<typeof getMoviesFailure>
        >();

        let requests = Array.from(
          { length: 500 },
          (_, i) => i + 1
        ).map((page) => this.moviesService.getPopular(page, apiKey));

        forkJoin(requests).subscribe(
          (responses) => {
            let allMovies: Array<Movie> = new Array<Movie>();

            responses.forEach((response) => {
              allMovies = allMovies.concat(response.results);
            });

            sub.next(getMoviesSuccess({ movies: allMovies }));
            sub.complete();
          },
          (error) => {
            this.matSnackBar.open(error.message, 'X', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            sub.next(getMoviesFailure({ error }));
            sub.complete();
          }
        );

        return sub;
      })
    )
  );

  loadMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActionTypes.GET_MOVIE_DETAILS),
      withLatestFrom(this.store.select((state) => state.moviesState.apiKey)),
      mergeMap(([action, apiKey]) =>
        this.moviesService
          .getDetails(
            (action as ReturnType<typeof getMovieDetails>).movieId,
            apiKey
          )
          .pipe(
            map((response) =>
              getMovieDetailsSuccess({
                movieDetails: response,
              })
            ),
            catchError((error) => {
              this.matSnackBar.open(error.message, 'X', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              return of(getMovieDetailsFailure(error));
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private matSnackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}
}
