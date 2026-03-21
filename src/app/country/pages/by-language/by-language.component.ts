import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';

export interface Language {
  name: string;
  query: string;
  emoji: string;
  colorClass: string;
  activeClass: string;
}

@Component({
  selector: 'app-by-language',
  imports: [DecimalPipe],
  templateUrl: './by-language.component.html',
})
export class ByLanguageComponent {
  private countryService = inject(CountryService);

  readonly languages: Language[] = [
    { name: 'Español',    query: 'spa', emoji: '🌎', colorClass: 'border-amber-300  bg-amber-50  text-amber-700  hover:bg-amber-100',  activeClass: 'border-amber-500  bg-amber-500  text-white shadow-amber-200' },
    { name: 'Inglés',     query: 'eng', emoji: '🌐', colorClass: 'border-blue-300   bg-blue-50   text-blue-700   hover:bg-blue-100',   activeClass: 'border-blue-500   bg-blue-500   text-white shadow-blue-200' },
    { name: 'Francés',    query: 'fra', emoji: '🗼', colorClass: 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100', activeClass: 'border-indigo-500 bg-indigo-500 text-white shadow-indigo-200' },
    { name: 'Árabe',      query: 'ara', emoji: '🌙', colorClass: 'border-green-300  bg-green-50  text-green-700  hover:bg-green-100',  activeClass: 'border-green-600  bg-green-600  text-white shadow-green-200' },
    { name: 'Portugués',  query: 'por', emoji: '🌿', colorClass: 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100', activeClass: 'border-emerald-600 bg-emerald-600 text-white shadow-emerald-200' },
    { name: 'Ruso',       query: 'rus', emoji: '❄️', colorClass: 'border-red-300    bg-red-50    text-red-700    hover:bg-red-100',    activeClass: 'border-red-600    bg-red-600    text-white shadow-red-200' },
    { name: 'Chino',      query: 'zho', emoji: '🐉', colorClass: 'border-rose-300   bg-rose-50   text-rose-700   hover:bg-rose-100',   activeClass: 'border-rose-600   bg-rose-600   text-white shadow-rose-200' },
    { name: 'Alemán',     query: 'deu', emoji: '⚙️', colorClass: 'border-gray-300   bg-gray-50   text-gray-700   hover:bg-gray-100',   activeClass: 'border-gray-700   bg-gray-700   text-white shadow-gray-300' },
    { name: 'Hindi',      query: 'hin', emoji: '🪷', colorClass: 'border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100', activeClass: 'border-orange-500 bg-orange-500 text-white shadow-orange-200' },
    { name: 'Italiano',   query: 'ita', emoji: '🍕', colorClass: 'border-lime-300   bg-lime-50   text-lime-700   hover:bg-lime-100',   activeClass: 'border-lime-600   bg-lime-600   text-white shadow-lime-200' },
    { name: 'Holandés',   query: 'nld', emoji: '🌷', colorClass: 'border-sky-300    bg-sky-50    text-sky-700    hover:bg-sky-100',    activeClass: 'border-sky-600    bg-sky-600    text-white shadow-sky-200' },
    { name: 'Sueco',      query: 'swe', emoji: '🫎', colorClass: 'border-cyan-300   bg-cyan-50   text-cyan-700   hover:bg-cyan-100',   activeClass: 'border-cyan-600   bg-cyan-600   text-white shadow-cyan-200' },
    { name: 'Turco',      query: 'tur', emoji: '🌙', colorClass: 'border-teal-300   bg-teal-50   text-teal-700   hover:bg-teal-100',   activeClass: 'border-teal-600   bg-teal-600   text-white shadow-teal-200' },
    { name: 'Japonés',    query: 'jpn', emoji: '⛩️', colorClass: 'border-pink-300   bg-pink-50   text-pink-700   hover:bg-pink-100',   activeClass: 'border-pink-600   bg-pink-600   text-white shadow-pink-200' },
    { name: 'Coreano',    query: 'kor', emoji: '🎋', colorClass: 'border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100', activeClass: 'border-purple-600 bg-purple-600 text-white shadow-purple-200' },
  ];

  selectedLanguage = signal<Language | null>(null);
  countries = signal<Country[]>([]);
  isLoading = signal(false);
  filterQuery = signal('');

  filteredCountries = computed(() => {
    const q = this.filterQuery().toLowerCase().trim();
    if (!q) return this.countries();
    return this.countries().filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
    );
  });

  totalCount = computed(() => this.countries().length);

  selectLanguage(lang: Language): void {
    if (this.selectedLanguage()?.query === lang.query) return;

    this.selectedLanguage.set(lang);
    this.filterQuery.set('');
    this.isLoading.set(true);
    this.countries.set([]);

    this.countryService.searchByLanguage(lang.query).subscribe({
      next: (countries) => {
        this.countries.set(countries.sort((a, b) => a.name.localeCompare(b.name)));
        this.isLoading.set(false);
      },
      error: () => {
        this.countries.set([]);
        this.isLoading.set(false);
      },
    });
  }

  clearSelection(): void {
    this.selectedLanguage.set(null);
    this.countries.set([]);
    this.filterQuery.set('');
  }
}
