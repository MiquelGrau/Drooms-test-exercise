import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'character/:id', component: CharacterDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
