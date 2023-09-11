import { createAction, props } from '@ngrx/store';
import { Character } from '../../models/character.model';

export const loadAllCharacters = createAction('[Characters] Load All Characters');
export const loadAllCharactersSuccess = createAction('[Characters] Load All Characters Success', props<{ characters: Character[] }>());
export const loadAllCharactersFailure = createAction('[Characters] Load All Characters Failure', props<{ error: any }>());

export const loadCharacterDetails = createAction('[Character] Load Character Details', props<{ characterId: string }>());
export const loadCharacterDetailsSuccess = createAction('[Character] Load Character Details Success', props<{ character: Character }>());
export const loadCharacterDetailsFailure = createAction('[Character] Load Character Details Failure', props<{ error: any }>());
export const noCharactersToLoad = createAction('[Characters] No Characters To Load');
