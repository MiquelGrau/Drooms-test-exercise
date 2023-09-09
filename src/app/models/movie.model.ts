export class Movie {
  public readonly id: number;

  constructor(
    public title: string,
    public episode_id: number,
    public opening_crawl: string,
    public director: string,
    public producer: string,
    public release_date: string,
    public species: string[],
    public starships: string[],
    public vehicles: string[],
    public characters: string[],
    public planets: string[],
    public url: string,
    public created: string,
    public edited: string
  ) {
    this.id = Movie.extractIdFromUrl(url);
  }

  static fromJSON(json: any): Movie {
    return new Movie(
      json.title,
      json.episode_id,
      json.opening_crawl,
      json.director,
      json.producer,
      json.release_date,
      json.species,
      json.starships,
      json.vehicles,
      json.characters,
      json.planets,
      json.url,
      json.created,
      json.edited
    );
  }

  private static extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }
}

export interface RawMovieData {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}
