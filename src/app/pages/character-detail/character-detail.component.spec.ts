import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState } from '../../store';
import { CharacterDetailComponent } from './character-detail.component';
import * as moviesActions from '../../store/movies/movies.actions';
import * as charactersActions from '../../store/characters/characters.actions';
import * as charactersSelectors from '../../store/characters/characters.selectors';
import * as moviesSelectors from '../../store/movies/movies.selectors';
import { mockCharacter } from 'src/assets/mocks/mock-character-data';
import { mockMovies } from '../../../assets/mocks/mock-movie-data';
import { appStateMock } from '../../../assets/mocks/app-state-data';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = appStateMock;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1',
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the correct actions on ngOnInit', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(charactersActions.loadCharacterDetails({ characterId: '1' }));
    expect(store.dispatch).toHaveBeenCalledWith(moviesActions.loadAllMovies());
  });

  it('should render a list of movies', fakeAsync(() => {
    store.overrideSelector(charactersSelectors.selectCurrentCharacter, mockCharacter);
    store.overrideSelector(moviesSelectors.selectMoviesForCurrentCharacter, mockMovies);
    fixture.detectChanges();

    tick();

    const movieItems = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(movieItems.length).toBe(mockMovies.length);
  }));

});
