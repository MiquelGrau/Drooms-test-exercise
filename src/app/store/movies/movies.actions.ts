import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';

export const loadAllMovies = createAction('[Movies] Load All Movies');
export const loadAllMoviesSuccess = createAction('[Movies] Load All Movies Success', props<{ movies: Movie[] }>());
export const loadAllMoviesFailure = createAction('[Movies] Load All Movies Failure', props<{ error: any }>());

export const loadMovieDetails = createAction('[Movies] Load Details', props<{ movieId: string }>());
export const loadMovieDetailsSuccess = createAction('[Movies] Load Details Success', props<{ movie: Movie }>());
export const loadMovieDetailsFailure = createAction('[Movies] Load Details Failure', props<{ error: any }>());
