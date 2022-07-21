import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as AOS from 'aos';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private movieListBus$ = new BehaviorSubject<any>([]);
  movieList$ = this.movieListBus$.asObservable();
  searchMovies: any[] = [];
  private searchMoviesListBus$ = new BehaviorSubject<any>([]);
  searchMovieList$ = this.searchMoviesListBus$.asObservable();

  constructor(private _HttpClient: HttpClient) {}

  getMovies(): Observable<any> {
    return this._HttpClient.get(environment.apiURL);
  }

  getMovieDetails(id: string): Observable<any> {
    return this._HttpClient.get(environment.apiURL + id + '/');
  }

  // Create Api for movie
  createMovie(movieObject: FormData): Observable<any> {
    return this._HttpClient.post(environment.apiURL, {
      name: movieObject.get('name'),
      image_object: movieObject.get('image_object'),
    });
  }

  // Search Api for finding movies.
  getSearch(keyword: string): Observable<any> {
    return this._HttpClient.get(environment.apiURL + `?search=${keyword}`);
  }

  // Set movie list
  setMoviesList(movies: any) {
    this.movieListBus$.next(movies);
  }

  // Set search list
  setSearchMoviesList(movies: any) {
    this.searchMoviesListBus$.next(movies);
  }

  // init animation
  aosAnimation(): void {
    AOS.init();
  }
}
