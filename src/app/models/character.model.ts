export class Character {
  public readonly id: string;

  constructor(
    public name: string,
    public birth_year: string,
    public eye_color: string,
    public gender: string,
    public hair_color: string,
    public height: string,
    public mass: string,
    public skin_color: string,
    public homeworld: string,
    public films: string[],
    public species: string[],
    public starships: string[],
    public vehicles: string[],
    public url: string,
    public created: string,
    public edited: string
  ) {
    this.id = Character.extractIdFromUrl(url);
  }

  static fromJSON(json: any): Character {
    return new Character(
      json.name,
      json.birth_year,
      json.eye_color,
      json.gender,
      json.hair_color,
      json.height,
      json.mass,
      json.skin_color,
      json.homeworld,
      json.films,
      json.species,
      json.starships,
      json.vehicles,
      json.url,
      json.created,
      json.edited
    );
  }

  public static extractIdFromUrl(url: string): string {
    const parts = url ? url.split('/') : [];
    return parts[parts.length - 2];
  }
}

export interface RawCharacterData {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}
