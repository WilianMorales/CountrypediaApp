import { Component, inject, linkedSignal } from '@angular/core';
import { of } from 'rxjs';

import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { CountryTableComponent } from "../../components/country-table/country-table.component";
import { Region } from '../../interfaces/region.type';
import { CountryService } from './../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  };

  return validRegions[queryParam] ?? '';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTableComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  queryParamMap = toSignal(this.activatedRoute.queryParamMap);

  selectedRegion = linkedSignal<Region>(() =>
    validateQueryParam(this.queryParamMap()?.get('region') ?? '')
  );

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      return this.countryService.searchByRegion(request.region);
    }
  });

  selectRegion(region: Region) {
    this.router.navigate(['/country/by-region'], {
      queryParams: {
        region
      }
    });
  }

}
