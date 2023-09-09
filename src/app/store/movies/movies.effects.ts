import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as moviesActions from './movies.actions';
import { SwapiService } from '../../services/swapi.service';
import { Movie, RawMovieData } from '../../models/movie.model';

@Injectable()
export class MoviesEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
      ofType(moviesActions.loadMovies),
      mergeMap(() => this.swapiService.getMovies()
        .pipe(
          map(response => {
            const movies = response.results.map((movieData: RawMovieData) => Movie.fromJSON(movieData));
            return moviesActions.loadMoviesSuccess({ movies });
          }),
          catchError(() => EMPTY)
        ))
    )
  );


  constructor(
    private actions$: Actions,
    private swapiService: SwapiService
  ) {}
}
