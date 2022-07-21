import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  movie: any = {};

  constructor(
    private _MoviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')?.toString();
    this.getMovieDetails(id);
  }
  getMovieDetails(id: any): void {
    this.subscription = this._MoviesService.getMovieDetails(id).subscribe({
      next: (response) => {
        this.movie = response;
      },
    });
  }
}
