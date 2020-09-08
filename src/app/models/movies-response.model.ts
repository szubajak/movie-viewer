import { Movie } from './movie.model';

export type MoviesResponse = {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
};
