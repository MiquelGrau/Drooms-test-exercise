import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import { MoviesState, moviesReducer } from './movies/movies.reducer';
import { CharactersState, charactersReducer } from './characters/characters.reducer';

export interface AppState {
  movies: MoviesState;
  characters: CharactersState;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: moviesReducer,
  characters: charactersReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
