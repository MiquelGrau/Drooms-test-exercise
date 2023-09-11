import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { combineLatest, concatMap, EMPTY, filter, iif, of, Subject, take, takeUntil, tap } from 'rxjs';
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
  private destroy$ = new Subject<void>();

  loadAllCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(charactersActions.loadAllCurrentMovieCharacters),
    switchMap(() =>
      combineLatest([
        this.store.select(moviesSelectors.selectCurrentMovie),
        this.store.select(charactersSelectors.selectAllCharacters)
      ]).pipe(takeUntil(this.destroy$))
    ),
    filter(([currentMovie, _]) => !!currentMovie),
    map(([currentMovie, storedCharacters]) => {
      const movieCharacterUrls = currentMovie!.characters || [];
      const storedCharacterUrls = storedCharacters.map(character => character.url);
      const missingCharacterUrls = movieCharacterUrls.filter(url => !storedCharacterUrls.includes(url));
      return { missingCharacterUrls, storedCharacters };
    }),
    switchMap(({ missingCharacterUrls }) => {
      // Use iif to determine which observable chain to execute
      return iif(
        () => missingCharacterUrls.length > 0,
        this.swapiService.getAllCharactersForMovie(missingCharacterUrls).pipe(
          map(response => {
            const characters = response.map((characterData: RawCharacterData) => Character.fromJSON(characterData));
            return charactersActions.loadAllCurrentMovieCharactersSuccess({ characters });
          }),
          // Here, we're adding the tap after successfully fetching the characters.
          tap(() => this.destroy$.next()),
          catchError(() => EMPTY)
        ),
        of(charactersActions.noCharactersToLoad()).pipe(
          tap(() => this.destroy$.next())
        )
      );
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
