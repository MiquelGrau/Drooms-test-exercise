import { createAction, props } from '@ngrx/store';
import { Character } from '../../models/character.model';

export const loadCharacters = createAction('[Characters] Load');
export const loadCharactersSuccess = createAction('[Characters] Load Success', props<{ characters: Character[] }>());
export const loadCharactersFailure = createAction('[Characters] Load Failure', props<{ error: any }>());
