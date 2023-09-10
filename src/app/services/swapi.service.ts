import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getAllCharacters(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/people/`);
  }

  getCharacterDetails(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/people/${id}/`);
  }
}
