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
  on(CharactersActions.loadCharactersSuccess, (state, { characters }) => ({ ...state, characters })),
  on(CharactersActions.loadCharactersFailure, (state, { error }) => ({ ...state, error }))
);
