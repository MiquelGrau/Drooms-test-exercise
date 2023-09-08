import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import { Movie } from '../../models/movie.model';

export interface MoviesState {
  movies: Movie[];
  error: any;
}

export const initialState: MoviesState = {
  movies: [],
  error: null
};

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadMoviesSuccess, (state, { movies }) => ({ ...state, movies })),
  on(MoviesActions.loadMoviesFailure, (state, { error }) => ({ ...state, error }))
);
