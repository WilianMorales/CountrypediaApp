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

    return {
      cca2: restCountry.cca2,
      flagSvg: restCountry.flags?.svg ?? '',
      name: restCountry.translations?.['spa']?.common ?? 'Sin nombre',
      currencies,
      capital: restCountry.capital?.join(', ') || 'Sin capital',
      continents: restCountry.continents?.join(', ') || 'Sin continente',
      population: restCountry.population ?? 0,
    }
  }

  static mapRestCountryArrayToCountryArray(restCountry: RestCountry[]): Country[] {
    return restCountry.map((country) => this.mapRestCountryToCountry(country));
  }
}
