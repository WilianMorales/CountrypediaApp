import { Component } from '@angular/core';
import { CountriesService } from '@services/countries.service';

import { Country } from '@interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(private countriesSerice: CountriesService) { }

  searchByRegion(region: string): void {
    this.countriesSerice.searchRegion(region)
     .subscribe(countries => {
       this.countries = countries;
     });
  }

}
