import { MoviesState } from './reducers/movies.reducer';

export interface AppState {
  readonly moviesState: MoviesState;
}
