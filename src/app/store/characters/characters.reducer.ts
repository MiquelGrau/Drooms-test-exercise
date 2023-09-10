import { createReducer, on } from '@ngrx/store';
import * as CharactersActions from './characters.actions';
import { Character } from '../../models/character.model';

export interface CharactersState {
  characters: Character[];
  error: any;
}

export const initialState: CharactersState = {
  characters: [],
  error: null
};

export const charactersReducer = createReducer(
  initialState,
  on(CharactersActions.loadAllCharactersSuccess, (state, { characters }) => ({ ...state, characters })),
  on(CharactersActions.loadAllCharactersFailure, (state, { error }) => ({ ...state, error }))
);
