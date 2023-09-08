import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

export const selectMoviesState = (state: AppState) => state.movies;

export const selectAllMovies = createSelector(
  selectMoviesState,
  (state) => state.movies
);
