import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as moviesActions from '../../store/movies/movies.actions';
import * as charactersActions from '../../store/characters/characters.actions';
import * as moviesSelectors from '../../store/movies/movies.selectors';
import * as charactersSelectors from '../../store/characters/characters.selectors';
import { AppState } from '../../store';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie$ = this.store.select(moviesSelectors.selectCurrentMovie);
  characters$ = this.store.select(charactersSelectors.selectCharactersForCurrentMovie);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const movieId = id;
      this.store.dispatch(moviesActions.loadMovieDetails({ movieId }));
      this.store.dispatch(charactersActions.loadAllCharacters());
    }
  }
}
