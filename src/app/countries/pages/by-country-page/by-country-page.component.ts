import { Component, OnInit } from '@angular/core';
import { Country } from '@interfaces/country.interface';
import { CountriesService } from '@services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue = '';

  constructor(private countriesSerice: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesSerice.cacheStore.byCountries.countries;
    this.initialValue = this.countriesSerice.cacheStore.byCountries.term;
  }

  searchByPais(term: string): void {
    this.isLoading = true;

    this.countriesSerice.searchCountry(term)
     .subscribe(countries => {
       this.countries = countries;
       this.isLoading = false;
     });
  }

}
