import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest-country.interface';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http
      .get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        delay(1000),
        catchError(() => of([]))
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http
      .get<RestCountry[]>(`${API_URL}/name/${encodeURIComponent(query)}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        delay(1000),
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

  getCountryByCode(code: string): Observable<Country> {
    return this.http
      .get<RestCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountry(resp[0])),
        delay(2000),
      );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http
      .get<RestCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        delay(1000),
        catchError(() => of([]))
      );
  }
}
