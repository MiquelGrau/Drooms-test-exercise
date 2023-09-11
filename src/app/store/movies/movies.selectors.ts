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

export const selectMoviesForCurrentCharacter = createSelector(
  selectAllMovies,
  (state: AppState) => state.characters.currentCharacter,
  (movies, currentCharacter) => {
    if (currentCharacter && currentCharacter.films) {
      return movies.filter(movie => {
        return currentCharacter.films.includes(movie.url);
      });
    }
    return [];
  }
);

export const selectIsLoading = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.isLoading
);

