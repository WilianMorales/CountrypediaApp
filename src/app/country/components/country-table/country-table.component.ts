import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

export interface Country {
  flags: {
    svg: string;
    png: string;
  };
  name: {
    common: string;
  };
  capital?: string[];
  region: string;
  population: number;
  languages?: Record<string, string>;
}

@Component({
  selector: 'country-table-list',
  imports: [DecimalPipe],
  templateUrl: './country-table.component.html',
})
export class CountryTableComponent {
  countries: Country[] = [];

  getMainLanguage(languages: Record<string, string> | undefined): string {
    if (!languages) return 'Sin idioma';
    const values = Object.values(languages);
    return values.length ? values[0] : 'Sin idioma';
  }
}
