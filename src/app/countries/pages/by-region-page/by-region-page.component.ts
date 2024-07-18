import { Component } from '@angular/core';
import { CountriesService } from '@services/countries.service';

import { Country } from '@interfaces/country';

type Region = 'Africa'| 'Americas'| 'Asia'| 'Europe'| 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public isLoading: boolean = false;
  public selectedRegion?: Region;

  constructor(private countriesSerice: CountriesService) { }

  searchByRegion(region: Region): void {

    this.selectedRegion = region;
    this.isLoading = true;

    this.countriesSerice.searchRegion(region)
     .subscribe(countries => {
       this.countries = countries;
       this.isLoading = false;
     });
  }

}
