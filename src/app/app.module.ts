import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { reducers, metaReducers } from './store';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { MoviesEffects } from './store/movies/movies.effects';
import { CharactersEffects } from './store/characters/characters.effects';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { ErrorInterceptor } from './services/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieDetailComponent,
    CharacterDetailComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      ...reducers,
      router: routerReducer
    }, { metaReducers }),
    ...(!environment.production ? [StoreDevtoolsModule.instrument()] : []),
    EffectsModule.forRoot([MoviesEffects, CharactersEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
