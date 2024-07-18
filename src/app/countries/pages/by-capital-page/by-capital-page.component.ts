import { Component } from '@angular/core';
import { Country } from '@interfaces/country';
import { CountriesService } from '@services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countriesSerice: CountriesService) { }

  searchByCapital(term: string): void {
    this.countriesSerice.searchCapital(term)
     .subscribe(countries => {
       this.countries = countries;
     });
  }

}
