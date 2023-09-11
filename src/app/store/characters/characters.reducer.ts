import { createReducer, on } from '@ngrx/store';
import * as CharactersActions from './characters.actions';
import { Character } from '../../models/character.model';

export interface CharactersState {
  characters: Character[];
  currentCharacter: Character | null;
  isLoading: boolean;
  error: any;
}

export const initialState: CharactersState = {
  characters: [],
  currentCharacter: null,
  isLoading: false,
  error: null
};

export const charactersReducer = createReducer(
  initialState,
  on(CharactersActions.loadAllCharacters, (state) => ({ ...state, isLoading: true })),
  on(CharactersActions.loadAllCharactersSuccess, (state, { characters }) => ({ ...state, characters, isLoading: false })),
  on(CharactersActions.loadAllCharactersFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(CharactersActions.noCharactersToLoad, (state) => ({ ...state, isLoading: false })),

  on(CharactersActions.loadCharacterDetails, (state) => ({ ...state, isLoading: true })),
  on(CharactersActions.loadCharacterDetailsSuccess, (state, { character }) =>
    ({ ...state, currentCharacter: character, characters: [...state.characters, character], isLoading: false })
  ),
  on(CharactersActions.loadCharacterDetailsFailure, (state, { error }) => ({ ...state, error, isLoading: false, currentCharacter: null }))
);
