import { Component, OnInit } from '@angular/core';
import { CountriesService } from '@services/countries.service';

import { Country } from '@interfaces/country.interface';
import { Region } from '@interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public isLoading: boolean = false;
  public selectedRegion?: Region;

  constructor(private countriesSerice: CountriesService) { }
  ngOnInit(): void {
    this.countries = this.countriesSerice.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesSerice.cacheStore.byRegion.region;
  }

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
