import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';

export const loadMovies = createAction('[Movies] Load');
export const loadMoviesSuccess = createAction('[Movies] Load Success', props<{ movies: Movie[] }>());
export const loadMoviesFailure = createAction('[Movies] Load Failure', props<{ error: any }>());

export const loadMovieDetails = createAction('[Movies] Load Details', props<{ movieId: number }>());
export const loadMovieDetailsSuccess = createAction('[Movies] Load Details Success', props<{ movie: Movie }>());
export const loadMovieDetailsFailure = createAction('[Movies] Load Details Failure', props<{ error: any }>());
