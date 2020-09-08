import { reducer, initialState } from './movies.reducer';
import { getMovies, getMoviesSuccess } from '../actions/movies.actions';
import { Movie } from '../models/movie.model';

describe('Movies Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('getMovies', () => {
    it('should enable loading', () => {
      const result = reducer(initialState, getMovies);

      expect(result.loading).toBe(true);
    });
  });

  describe('getMoviesSuccess', () => {
    it('should disable loading and push movies', () => {
      const movies = [{ title: 'Terminator 2' } as Movie];

      const result = reducer(
        { ...initialState, loading: true },
        getMoviesSuccess({ movies })
      );

      expect(result.loading).toBe(false);
      expect(result.movies).toBe(movies);
    });
  });

  describe('getMoviesFailure', () => {
    it('should disable loadings', () => {
      const result = reducer(
        { ...initialState, loading: true },
        getMoviesSuccess({ movies: new Array<Movie>() })
      );

      expect(result.loading).toBe(false);
    });
  });
});
