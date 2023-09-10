import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as moviesActions from '../store/movies/movies.actions';
import * as moviesSelectors from '../store/movies/movies.selectors'; // importar els selectors
import { AppState } from '../store';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie$ = this.store.select(moviesSelectors.selectCurrentMovie);

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const movieId = +id;
      this.store.dispatch(moviesActions.loadMovieDetails({ movieId }));
    } else {
      // Error page
    }
  }
}
