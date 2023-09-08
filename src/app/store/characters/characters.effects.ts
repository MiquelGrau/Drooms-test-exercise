import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as charactersActions from './characters.actions';
import { SwapiService } from '../../services/swapi.service';

@Injectable()
export class CharactersEffects {

  loadCharacters$ = createEffect(() => this.actions$.pipe(
      ofType(charactersActions.loadCharacters),
      mergeMap(() => this.swapiService.getCharacters()
        .pipe(
          map(characters => charactersActions.loadCharactersSuccess({ characters })),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private swapiService: SwapiService
  ) {}
}
