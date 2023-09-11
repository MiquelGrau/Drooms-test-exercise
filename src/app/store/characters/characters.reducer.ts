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
  on(CharactersActions.loadAllCurrentMovieCharacters, (state) => ({ ...state, isLoading: true })),
  on(CharactersActions.loadAllCurrentMovieCharactersSuccess, (state, { characters }) => {
    const updatedCharacters = [...state.characters];
    characters.forEach(character => {
      if (!updatedCharacters.some(existingChar => existingChar.url === character.url)) {
        updatedCharacters.push(character);
      }
    });
    return { ...state, characters: updatedCharacters, isLoading: false };
  }),
  on(CharactersActions.loadAllCurrentMovieCharactersFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(CharactersActions.noCharactersToLoad, (state) => ({ ...state, isLoading: false })),

  on(CharactersActions.loadCharacterDetails, (state) => ({ ...state, isLoading: true })),
  on(CharactersActions.loadCharacterDetailsSuccess, (state, { character }) => {
    const characterExists = state.characters.some(char => char.id === character.id);

    let updatedCharacters;
    if (characterExists) {
      updatedCharacters = state.characters.map(char => char.id === character.id ? character : char);
    } else {
      updatedCharacters = [...state.characters, character];
    }

    return {
      ...state,
      currentCharacter: character,
      characters: updatedCharacters,
      isLoading: false
    };
  }),
  on(CharactersActions.loadCharacterDetailsFailure, (state, { error }) => ({ ...state, error, isLoading: false, currentCharacter: null }))
);
