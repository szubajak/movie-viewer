import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesResponse } from '../models/movies-response.model';
import { MovieDetails } from '../models/movie-details.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private SERVICE_URL = 'https://api.themoviedb.org/3/movie';

  constructor(private httpClient: HttpClient) {}

  getPopular(page: number, apiKey: string) {
    return this.httpClient.get<MoviesResponse>(
      `${this.SERVICE_URL}/popular?api_key=${apiKey}&page=${page}`
    );
  }

  getDetails(movieId: number, apiKey: string) {
    return this.httpClient.get<MovieDetails>(
      `${this.SERVICE_URL}/${movieId}?api_key=${apiKey}`
    );
  }
}
