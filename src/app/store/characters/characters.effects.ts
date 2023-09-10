import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import * as charactersActions from './characters.actions';
import * as charactersSelectors from './characters.selectors';
import { SwapiService } from '../../services/swapi.service';
import { Character, RawCharacterData } from '../../models/character.model';
import { Store } from '@ngrx/store';
import { AppState } from '../index';

@Injectable()
export class CharactersEffects {

  loadAllCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(charactersActions.loadAllCharacters),
    mergeMap(() => this.swapiService.getAllCharacters()
      .pipe(
        map(response => {
          const characters = response.results.map((characterData: RawCharacterData) => Character.fromJSON(characterData));
          return charactersActions.loadAllCharactersSuccess({ characters });
        }),
        catchError(() => EMPTY)
      ))
  ));

  loadCharacterDetails$ = createEffect(() => this.actions$.pipe(
    ofType(charactersActions.loadCharacterDetails),
    switchMap(action =>
      this.store.select(charactersSelectors.selectCharacterById(action.characterId)).pipe(
        map(storedCharacter => ({ action, storedCharacter }))
      )
    ),
    mergeMap(({ action, storedCharacter }) => {
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
