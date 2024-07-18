import { Component, OnInit } from '@angular/core';
import { Country } from '@interfaces/country.interface';
import { CountriesService } from '@services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesSerice: CountriesService) { }
  ngOnInit(): void {
    this.countries = this.countriesSerice.cacheStore.byCapital.countries;
    this.initialValue = this.countriesSerice.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {

    this.isLoading = true;

    this.countriesSerice.searchCapital(term)
     .subscribe(countries => {
       this.countries = countries;
       this.isLoading = false;
     });
  }

}
