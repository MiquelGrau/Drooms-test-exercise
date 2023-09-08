import { createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { selectRouterState } from '../router/router.selectors';

export const selectCharactersState = (state: AppState) => state.characters;

export const selectAllCharacters = createSelector(
  selectCharactersState,
  (state) => state.characters
);

export const selectCurrentCharacter = createSelector(
  selectCharactersState,
  selectRouterState,
  (charactersState, routerState) => {
    if (routerState && routerState.state && routerState.state.url) {
      const urlParts = routerState.state.url.split('/');
      const characterId = urlParts[urlParts.length - 1];

      return charactersState.characters.find(character => {
        const characterUrlParts = character.url.split('/');
        return characterUrlParts[characterUrlParts.length - 2] === characterId;
      });
    }
    return null;
  }
);
