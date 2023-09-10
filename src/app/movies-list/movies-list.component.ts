import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as moviesActions from '../store/movies/movies.actions';
import * as moviesSelectors from '../store/movies/movies.selectors';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {
  movies$ = this.store.select(moviesSelectors.selectAllMovies);

  constructor(private store: Store<AppState>,
              private router: Router) {}

  ngOnInit() {
    this.store.dispatch(moviesActions.loadMovies());
  }
}
