import { Movie, RawMovieData } from '../../app/models/movie.model';

const rawMoviesData: RawMovieData[] = [
  {
    title: 'A New Hope',
    episode_id: 1,
    opening_crawl: '...',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    species: [],
    starships: [],
    vehicles: [],
    characters: [],
    planets: [],
    url: 'http://some-url.com/1/',
    created: '...',
    edited: '...'
  },
  {
    title: 'The Empire Strikes Back',
    episode_id: 2,
    opening_crawl: '...',
    director: 'Irvin Kershner',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1980-05-17',
    species: [],
    starships: [],
    vehicles: [],
    characters: [],
    planets: [],
    url: 'http://some-url.com/2/',
    created: '...',
    edited: '...'
  }
];

export const mockMovies: Movie[] = rawMoviesData.map(data => Movie.fromJSON(data));
