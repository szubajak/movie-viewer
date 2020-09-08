import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';

import { MoviesEffects } from './movies.effects';
import * as fromMovies from './../reducers/movies.reducer';

describe('MoviesEffects', () => {
  let actions$: Observable<any>;
  let effects: MoviesEffects;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesEffects, provideMockActions(() => actions$)],
      imports: [
        StoreModule.forRoot({ moviesState: fromMovies.reducer }, {}),
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
    });

    effects = TestBed.inject(MoviesEffects);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
