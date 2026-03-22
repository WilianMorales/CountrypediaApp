import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private route = inject(ActivatedRoute);
  private countryService = inject(CountryService);

  countryCode = toSignal(this.route.params.pipe(map(p => p['code'])));

  countryResource = rxResource({
    request: () => ({ code: this.countryCode() }),
    loader: ({ request }) => {
      return this.countryService.getCountryByCode(request.code);
    }
  });
}
