import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Country } from '../../interfaces/country.interfaces';
import { GlobeComponent } from "../../../shared/components/globe/globe.component";

@Component({
  selector: 'country-table-list',
  imports: [DecimalPipe, RouterLink, GlobeComponent],
  templateUrl: './country-table.component.html',
})
export class CountryTableComponent {
  countries = input.required<Country[]>();

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
