import type { Country, CountryCurrency } from "../interfaces/country.interfaces";
import type { RestCountry } from "../interfaces/rest-country.interface";

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    const currencies: CountryCurrency[] = Object.values(restCountry.currencies ?? {})
      .map(c => ({ name: c.name, symbol: c.symbol }));

    const languages = Object.values(restCountry.languages ?? {});
    const borders = restCountry.borders ?? [];
    const timezones = restCountry.timezones ?? [];

    return {
      cca2: restCountry.cca2,
      cca3: restCountry.cca3,
      flagSvg: restCountry.flags?.svg ?? '',
      flag: restCountry.flag ?? '',
      coatOfArms: restCountry.coatOfArms?.png ?? restCountry.coatOfArms?.svg ?? '',
      name: restCountry.translations?.['spa']?.common ?? restCountry.name?.common ?? 'Sin nombre',
      officialName: restCountry.translations?.['spa']?.official ?? restCountry.name?.official ?? 'Sin nombre oficial',
      currencies,
      capital: restCountry.capital?.join(', ') || 'Sin capital',
      continents: restCountry.continents?.join(', ') || 'Sin continente',
      region: restCountry.region ?? 'Sin región',
      population: restCountry.population ?? 0,
      languages,
      area: restCountry.area ?? 0,
      timezones,
      borders,
    };
  }

  static mapRestCountryArrayToCountryArray(restCountry: RestCountry[]): Country[] {
    return restCountry.map((country) => this.mapRestCountryToCountry(country));
  }
}
