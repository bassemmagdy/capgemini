import { Component, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  animationName = 'fade-up';
  subscription: Subscription = new Subscription();
  moviesAll: any[] = [];
  searchMovies: any[] = [];

  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
    this._MoviesService.aosAnimation();
    this._MoviesService.searchMovieList$.subscribe({
      next: (response) => {
        this.moviesAll = response;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // get all movies
  getMovies(): void {
    this.subscription = this._MoviesService
      .getMovies()
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          this.moviesAll = response;
          this._MoviesService.setMoviesList(this.moviesAll);
        },
      });
  }
}
