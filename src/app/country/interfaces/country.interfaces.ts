export interface CountryCurrency {
  name: string;
  symbol: string;
}

export interface Country {
  cca2: string;
  cca3: string;
  flag: string;
  flagSvg: string;
  coatOfArms: string;
  name: string;
  officialName: string;
  currencies: CountryCurrency[];
  capital: string;
  continents: string;
  region: string;
  population: number;
  languages: string[];
  area: number;
  timezones: string[];
  borders: string[];
}
