import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import { Movie } from '../../models/movie.model';

export interface MoviesState {
  movies: Movie[];
  currentMovie: Movie | null;
  isLoading: boolean;
  error: any;
}

export const initialState: MoviesState = {
  movies: [],
  currentMovie: null,
  isLoading: false,
  error: null
};

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadAllMovies, (state) => ({ ...state, isLoading: true })),
  on(MoviesActions.loadAllMoviesSuccess, (state, { movies }) => ({ ...state, movies, isLoading: false })),
  on(MoviesActions.loadAllMoviesFailure, (state, { error }) => ({ ...state, error, isLoading: false })),

  on(MoviesActions.loadMovieDetails, (state) => ({ ...state, isLoading: true })),
  on(MoviesActions.loadMovieDetailsSuccess, (state, { movie }) => ({ ...state, currentMovie: movie, isLoading: false })),
  on(MoviesActions.loadMovieDetailsFailure, (state, { error }) => ({ ...state, error, isLoading: false, currentMovie: null }))
);
