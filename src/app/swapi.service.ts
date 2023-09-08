import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get('https://swapi.dev/api/films/');
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`https://swapi.dev/api/films/${id}/`);
  }

  getCharacterDetails(id: number): Observable<any> {
    return this.http.get(`https://swapi.dev/api/people/${id}/`);
  }
}
