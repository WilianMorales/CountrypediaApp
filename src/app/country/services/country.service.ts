import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest-country.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http
      .get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError(() => of([]))
      );
  }

  searchByCountryName(query: string): Observable<Country[]> {
    return this.http
      .get<RestCountry[]>(`${API_URL}/name/${encodeURIComponent(query)}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError(() => of([]))
      );
  }

  searchByLanguage(langCode: string): Observable<Country[]> {
    return this.http
      .get<RestCountry[]>(`${API_URL}/lang/${langCode}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError(() => of([]))
      );
  }

  getCountryByCode(code: string): Observable<Country | null> {
    return this.http
      .get<RestCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((resp) => (resp.length ? CountryMapper.mapRestCountryToCountry(resp[0]) : null)),
        catchError(() => of(null))
      );
  }
}
