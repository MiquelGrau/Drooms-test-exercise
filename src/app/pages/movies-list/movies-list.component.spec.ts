import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MoviesListComponent } from './movies-list.component';
import { AppState } from '../../store';
import * as moviesActions from '../../store/movies/movies.actions';
import * as moviesSelectors from '../../store/movies/movies.selectors';
import { mockMovies } from 'src/assets/mocks/mock-mocie-data';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the loadAllMovies action on ngOnInit', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(moviesActions.loadAllMovies());
  });

  it('should render a list of movies', fakeAsync(() => {
    store.overrideSelector(moviesSelectors.selectAllMovies, mockMovies);
    fixture.detectChanges();

    tick();

    const movieItems = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(movieItems.length).toBe(2);
  }));

  it('should have correct routerLink for each movie', () => {
    store.overrideSelector(moviesSelectors.selectAllMovies, mockMovies);
    fixture.detectChanges();

    const movieItems = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(movieItems[0].nativeElement.getAttribute('href')).toBe('/movie/1');
    expect(movieItems[1].nativeElement.getAttribute('href')).toBe('/movie/2');
  });
});
