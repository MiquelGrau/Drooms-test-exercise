import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState } from '../../store';
import { MovieDetailComponent } from './movie-detail.component';
import * as moviesActions from '../../store/movies/movies.actions';
import * as charactersActions from '../../store/characters/characters.actions';
import * as charactersSelectors from '../../store/characters/characters.selectors';
import * as moviesSelectors from '../../store/movies/movies.selectors';
import { mockCharacters } from 'src/assets/mocks/mock-character-data';
import { mockMovie } from '../../../assets/mocks/mock-movie-data';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    movies: {
      movies: [],
      currentMovie: null,
      isLoading: false,
      error: null
    },
    characters: {
      characters: [],
      currentCharacter: null,
      isLoading: false,
      error: null
    },
    router: {
      state: null,
      navigationId: 0
    }
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1',
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the correct actions on ngOnInit', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(moviesActions.loadMovieDetails({ movieId: '1' }));
    expect(store.dispatch).toHaveBeenCalledWith(charactersActions.loadAllCharacters());
  });

  it('should render a list of characters', fakeAsync(() => {
    store.overrideSelector(moviesSelectors.selectCurrentMovie, mockMovie);
    store.overrideSelector(charactersSelectors.selectCharactersForCurrentMovie, mockCharacters);
    fixture.detectChanges();

    tick();

    const characterItems = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(characterItems.length).toBe(2);
  }));


  it('should have correct routerLink for each character', () => {
    store.overrideSelector(charactersSelectors.selectCharactersForCurrentMovie, mockCharacters);
    fixture.detectChanges();

    const characterItems = fixture.debugElement.queryAll(By.css('.list-group-item'));
    for (let i = 0; i < mockCharacters.length; i++) {
      const expectedHref = `/character/${mockCharacters[i].id}`;
      expect(characterItems[i].nativeElement.getAttribute('href')).toBe(expectedHref);
    }
  });
});
