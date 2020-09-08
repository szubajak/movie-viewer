import { Movie } from './movie.model';

export interface MovieDetails extends Movie {
  tagline: string;
}
