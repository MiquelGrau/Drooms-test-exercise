import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Character } from '../models/character.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private readonly BASE_URL = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/films/`);
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/films/${id}/`);
  }

  /**
   * Fetches all characters associated with a movie.
   * Given the movie character URLs, it determines which pages of the SWAPI to fetch,
   * ensuring no unnecessary requests are made. It accounts for anomalies in the API's pagination.
   *
   * @param movieCharacterUrls - Array of character URLs associated with a movie.
   * @returns An Observable of an array of characters.
   */
  getAllCharactersForMovie(movieCharacterUrls: string[]): Observable<Character[]> {
    // Extract character IDs from the provided URLs
    const characterIds = movieCharacterUrls.map(url => Number(Movie.extractIdFromUrl(url)));

    // Determine unique pages to fetch based on character IDs
    const totalPagesToFetch = Array.from(new Set(characterIds.map(Character.getPageNumberForCharacterId)));

    // Create a collection of HTTP requests based on the pages determined
    const pageRequests = totalPagesToFetch.map(pageNumber => this.http.get<SWAPIResponse>(`${this.BASE_URL}/people/?page=${pageNumber}`));

    return forkJoin(pageRequests).pipe(
      // Combine and flatten the results from all the fetched pages
      map((pages: SWAPIResponse[]) => {
        return pages.flatMap(page => page.results);
      })
    );
  }

  getCharacterDetails(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/people/${id}/`);
  }
}

export interface SWAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}
