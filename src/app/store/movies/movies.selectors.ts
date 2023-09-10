import { createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { MoviesState } from './movies.reducer';
import { Movie } from '../../models/movie.model';

export const selectMoviesState = (state: AppState) => state.movies;

export const selectAllMovies = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.movies
);

export const selectCurrentMovie = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.currentMovie
);

export const selectMovieById = (movieId: string) => createSelector(
  selectAllMovies,
  (movies: Movie[]) => movies.find(movie => movie.id === movieId)
);
