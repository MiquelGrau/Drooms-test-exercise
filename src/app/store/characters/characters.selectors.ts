import { createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { selectRouterState } from '../router/router.selectors';
import { Character } from 'src/app/models/character.model';
import { MoviesState } from '../movies/movies.reducer';
import { selectMoviesState } from '../movies/movies.selectors';
import { CharactersState } from './characters.reducer';

export const selectCharactersState = (state: AppState) => state.characters;

export const selectAllCharacters = createSelector(
  selectCharactersState,
  (state) => state.characters
);

export const selectCurrentCharacter = createSelector(
  selectCharactersState,
  (charactersState: CharactersState) => charactersState.currentCharacter
);

export const selectCharacterById = (characterId: string) => createSelector(
  selectAllCharacters,
  characters => characters.find(character => character.id === characterId)
);

export const selectCharactersForCurrentMovie = createSelector(
  selectAllCharacters,
  (state: AppState) => state.movies.currentMovie,
  (characters, movie) => {
    if (movie && movie.characters) {
      return characters.filter(character => {
        const characterIdsFromMovie = movie.characters.map(url => Character.extractIdFromUrl(url));
        return characterIdsFromMovie.includes(character.id);
      });
    }
    return [];
  }
);

export const selectIsLoading = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.isLoading
);
