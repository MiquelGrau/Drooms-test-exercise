import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as characterActions from '../../store/characters/characters.actions';
import * as movieActions from '../../store/movies/movies.actions';
import * as characterSelectors from '../../store/characters/characters.selectors';
import * as movieSelectors from '../../store/movies/movies.selectors';
import { AppState } from '../../store';
import * as moviesSelectors from '../../store/movies/movies.selectors';
import * as charactersSelectors from '../../store/characters/characters.selectors';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character$ = this.store.select(characterSelectors.selectCurrentCharacter);
  movies$ = this.store.select(movieSelectors.selectMoviesForCurrentCharacter);
  isLoadingMovies$ = this.store.select(moviesSelectors.selectIsLoading);
  isLoadingCharacters$ = this.store.select(charactersSelectors.selectIsLoading);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const characterId = id;
      this.store.dispatch(characterActions.loadCharacterDetails({ characterId }));
      this.store.dispatch(movieActions.loadAllMovies());
    }
  }
}
