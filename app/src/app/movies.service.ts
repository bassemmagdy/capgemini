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

  imgUrl = 'https://image.tmdb.org/t/p/original'; // img path
  ratString = 'background-image: linear-gradient(to top,var(--orang-color)'; //rating style
  constructor(private _HttpClient: HttpClient) {}

  getMovies(): Observable<any> {
    return this._HttpClient.get(environment.apiURL);
  }

  getMovieDetails(id: string): Observable<any> {
    return this._HttpClient.get(environment.apiURL + id + '/');
  }

  createMovie(movieObject: FormData): Observable<any> {
    return this._HttpClient.post(environment.apiURL, {
      name: movieObject.get('name'),
      image_object: movieObject.get('image_object'),
    });
  }

  getSearch(keyword: string): Observable<any> {
    return this._HttpClient.get(environment.apiURL + `?search=${keyword}`);
  }

  setMoviesList(movies: any) {
    this.movieListBus$.next(movies);
  }

  setSearchMoviesList(movies: any) {
    this.searchMoviesListBus$.next(movies);
  }

  aosAnimation(): void {
    AOS.init();
  }
}
