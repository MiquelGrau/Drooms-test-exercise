import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwapiService, SWAPIResponse } from './swapi.service';
import { mockCharacters } from '../../assets/mocks/mock-character-data';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwapiService]
    });

    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all movies', () => {
    const dummyMovies = [{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }];

    service.getAllMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/films/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should retrieve movie details by ID', () => {
    const dummyMovie = { title: 'A New Hope' };

    service.getMovieDetails('1').subscribe(movie => {
      expect(movie).toEqual(dummyMovie);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/films/1/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovie);
  });

  it('should retrieve character details by ID', () => {
    const dummyCharacter = { name: 'Luke Skywalker' };

    service.getCharacterDetails('1').subscribe(character => {
      expect(character).toEqual(dummyCharacter);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/people/1/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCharacter);
  });

  it('should retrieve all characters for a movie', () => {
    const dummyCharacterUrls = ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/4/'];

    service.getAllCharactersForMovie(dummyCharacterUrls).subscribe(characters => {
      expect(characters.length).toBe(2);
      expect(characters).toEqual(mockCharacters);
    });

    const req1 = httpMock.expectOne('https://swapi.dev/api/people/?page=1');
    expect(req1.request.method).toBe('GET');
    req1.flush({ results: [mockCharacters[0], mockCharacters[1]] });
  });


});

