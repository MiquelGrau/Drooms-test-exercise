import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Character } from '../models/character.model';

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

  getAllCharacters(): Observable<Character[]> {
    const pageUrl = `${this.BASE_URL}/people/`;
    return this.http.get<SWAPIResponse>(pageUrl).pipe(
      switchMap((firstPage: any) => {
        const totalCharacters = firstPage.count;
        const totalPages = Math.ceil(totalCharacters / firstPage.results.length);
        const pageRequests = [];

        for (let i = 1; i <= totalPages; i++) {
          pageRequests.push(this.http.get<SWAPIResponse>(`${pageUrl}?page=${i}`));
        }

        return forkJoin(pageRequests);
      }),
      map((pages: SWAPIResponse[]) => {
        return pages.flatMap(page => page.results);
      })
    );
  }

  getCharacterDetails(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/people/${id}/`);
  }
}

interface SWAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}
