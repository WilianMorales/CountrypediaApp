import type { Country } from "../interfaces/country.interfaces";
import type { RestCountry } from "../interfaces/rest-country.interface";

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    const currencies = Object.values(restCountry.currencies ?? {})
      .map((currency) =>
        currency.symbol
          ? `(${currency.symbol}) ${currency.name}`
          : currency.name
      )
      .join(", ") || "Sin moneda";

    const languages = Object.values(restCountry.languages ?? {}).join(', ') || 'Sin idiomas';
    const borders = restCountry.borders?.join(', ') || 'Sin fronteras';
    const timezones = restCountry.timezones?.join(', ') || 'Sin zona horaria';

    return {
      cca2: restCountry.cca2,
      flagSvg: restCountry.flags?.svg ?? '',
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
    }
  }

  static mapRestCountryArrayToCountryArray(restCountry: RestCountry[]): Country[] {
    return restCountry.map((country) => this.mapRestCountryToCountry(country));
  }
}
