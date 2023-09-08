import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private readonly BASE_URL = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/films/`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/films/${id}/`);
  }

  getCharacters(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/people/`);
  }

  getCharacterDetails(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/people/${id}/`);
  }
}
