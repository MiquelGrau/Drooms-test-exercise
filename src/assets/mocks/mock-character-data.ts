import { Character, RawCharacterData } from '../../app/models/character.model';

const rawCharactersData: RawCharacterData[] = [
  {
    name: "Luke Skywalker",
    birth_year: "19BBY",
    eye_color: "blue",
    gender: "male",
    hair_color: "blond",
    height: "172",
    mass: "77",
    skin_color: "fair",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
    species: [],
    starships: ["https://swapi.dev/api/starships/12/"],
    vehicles: ["https://swapi.dev/api/vehicles/14/"],
    url: "https://swapi.dev/api/people/1/",
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z"
  },
  {
    name: "Darth Vader",
    birth_year: "41.9BBY",
    eye_color: "yellow",
    gender: "male",
    hair_color: "none",
    height: "202",
    mass: "136",
    skin_color: "white",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
    species: [],
    starships: [],
    vehicles: [],
    url: "https://swapi.dev/api/people/4/",
    created: "2014-12-10T15:18:20.704000Z",
    edited: "2014-12-20T21:17:50.313000Z"
  }
];

export const mockCharacters: Character[] = rawCharactersData.map(data => Character.fromJSON(data));
export const mockCharacter: Character = Character.fromJSON(rawCharactersData);
