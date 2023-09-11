import { createAction, props } from '@ngrx/store';
import { Character } from '../../models/character.model';

export const loadAllCurrentMovieCharacters = createAction('[Characters] Load All Current Movie Characters');
export const loadAllCurrentMovieCharactersSuccess = createAction('[Characters] Load All Current Movie Characters Success', props<{ characters: Character[] }>());
export const loadAllCurrentMovieCharactersFailure = createAction('[Characters] Load All Current Movie Characters Failure', props<{ error: any }>());

export const loadCharacterDetails = createAction('[Character] Load Character Details', props<{ characterId: string }>());
export const loadCharacterDetailsSuccess = createAction('[Character] Load Character Details Success', props<{ character: Character }>());
export const loadCharacterDetailsFailure = createAction('[Character] Load Character Details Failure', props<{ error: any }>());
export const noCharactersToLoad = createAction('[Characters] No Characters To Load');
