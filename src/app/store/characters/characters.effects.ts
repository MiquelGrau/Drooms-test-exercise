import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, filter, of, take, tap } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import * as charactersActions from './characters.actions';
import * as charactersSelectors from './characters.selectors';
import * as moviesSelectors from '../movies/movies.selectors';
import { SwapiService } from '../../services/swapi.service';
import { Character, RawCharacterData } from '../../models/character.model';
import { Store } from '@ngrx/store';
import { AppState } from '../index';

@Injectable()
export class CharactersEffects {

  loadAllCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(charactersActions.loadAllCharacters),
    switchMap(() =>
      this.store.select(moviesSelectors.selectCurrentMovie).pipe(
        filter(currentMovie => !!currentMovie),
        switchMap(currentMovie => {
          // Get the character URLs from the current movie
          const movieCharacterUrls = currentMovie ? currentMovie.characters : [];

          // Get the currently stored characters to determine which ones are missing
          return this.store.select(charactersSelectors.selectAllCharacters).pipe(
            map(storedCharacters => {
              const storedCharacterUrls = storedCharacters.map(character => character.url);
              const missingCharacterUrls = movieCharacterUrls.filter(url => !storedCharacterUrls.includes(url));
              return missingCharacterUrls;
            })
          )
        })
      )
    ),
    mergeMap(missingCharacterUrls => {
      if (missingCharacterUrls && missingCharacterUrls.length > 0) {
        return this.swapiService.getAllCharactersForMovie(missingCharacterUrls)
          .pipe(
            map(response => {
              const characters = response.map((characterData: RawCharacterData) => Character.fromJSON(characterData));
              return charactersActions.loadAllCharactersSuccess({ characters });
            }),
            catchError(() => EMPTY)
          );
      } else {
        return of(charactersActions.noCharactersToLoad());
      }
    })
  ));

  loadCharacterDetails$ = createEffect(() => this.actions$.pipe(
    ofType(charactersActions.loadCharacterDetails),
    switchMap(action =>
      this.store.select(charactersSelectors.selectCharacterById(action.characterId)).pipe(
        take(1),
        map(storedCharacter => ({ action, storedCharacter }))
      )
    ),
    switchMap(({ action, storedCharacter }) => {
      if (storedCharacter) {
        return of(charactersActions.loadCharacterDetailsSuccess({ character: storedCharacter }));
      }
      return this.swapiService.getCharacterDetails(action.characterId)
        .pipe(
          map(characterData => {
            const character = Character.fromJSON(characterData);
            return charactersActions.loadCharacterDetailsSuccess({ character });
          }),
          catchError(() => EMPTY)
        );
    })
  ));

  constructor(
    private actions$: Actions,
    private swapiService: SwapiService,
    private store: Store<AppState>
  ) {}
}
