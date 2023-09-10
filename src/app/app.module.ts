import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieDetailComponent,
    CharacterDetailComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
