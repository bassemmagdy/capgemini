import { Subscription, delay } from 'rxjs';
import { MoviesService } from './../movies.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  moviesList: any = [];
  searchDisabled = false;
  event$;

  constructor(private _MoviesService: MoviesService, private router: Router) {
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/home') {
          this.searchDisabled = true;
        } else {
          this.searchDisabled = false;
        }
      }
    });
  }
  ngOnInit(): void {
    this._MoviesService.movieList$.subscribe({
      next: (response) => {
        this.moviesList = response;
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Function To Search Api
  getSearch(keyword: string): void {
    if (keyword) {
      this.subscription = this._MoviesService
        .getSearch(keyword)
        .pipe(delay(800))
        .subscribe({
          next: (response) => {
            this._MoviesService.searchMovies = response;
            this._MoviesService.setSearchMoviesList(response);
          },
        });
    } else {
      // search cancelation by binding list of all movies to the search list
      this._MoviesService.setSearchMoviesList(this.moviesList);
    }
  }
}
