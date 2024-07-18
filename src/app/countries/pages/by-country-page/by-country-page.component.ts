import { Component } from '@angular/core';
import { Country } from '@interfaces/country.interface';
import { CountriesService } from '@services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor(private countriesSerice: CountriesService) { }

  searchByPais(term: string): void {
    this.countriesSerice.searchCountry(term)
     .subscribe(countries => {
       this.countries = countries;
     });
  }

}
