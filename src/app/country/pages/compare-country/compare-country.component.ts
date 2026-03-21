import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-compare-country',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './compare-country.component.html',
})
export class CompareCountryComponent {
  private countryService = inject(CountryService);

  // --- Country A ---
  queryA = signal('');
  resultsA = signal<Country[]>([]);
  isLoadingA = signal(false);
  selectedA = signal<Country | null>(null);
  showDropdownA = signal(false);

  // --- Country B ---
  queryB = signal('');
  resultsB = signal<Country[]>([]);
  isLoadingB = signal(false);
  selectedB = signal<Country | null>(null);
  showDropdownB = signal(false);

  canCompare = computed(() => !!this.selectedA() && !!this.selectedB());

  aHasMorePop = computed(() => {
    const a = this.selectedA();
    const b = this.selectedB();
    if (!a || !b) return false;
    return a.population > b.population;
  });

  aHasMoreArea = computed(() => {
    const a = this.selectedA();
    const b = this.selectedB();
    if (!a || !b) return false;
    return a.area > b.area;
  });

  private debounceA: ReturnType<typeof setTimeout> | null = null;
  private debounceB: ReturnType<typeof setTimeout> | null = null;

  onSearchA(query: string): void {
    this.queryA.set(query);
    this.selectedA.set(null);
    if (this.debounceA) clearTimeout(this.debounceA);

    if (!query.trim() || query.length < 2) {
      this.showDropdownA.set(false);
      this.resultsA.set([]);
      return;
    }

    this.debounceA = setTimeout(() => this.search(query, 'A'), 400);
  }

  onSearchB(query: string): void {
    this.queryB.set(query);
    this.selectedB.set(null);
    if (this.debounceB) clearTimeout(this.debounceB);

    if (!query.trim() || query.length < 2) {
      this.showDropdownB.set(false);
      this.resultsB.set([]);
      return;
    }

    this.debounceB = setTimeout(() => this.search(query, 'B'), 400);
  }

  private search(query: string, side: 'A' | 'B'): void {
    const setLoading = side === 'A' ? this.isLoadingA : this.isLoadingB;
    const setResults = side === 'A' ? this.resultsA : this.resultsB;
    const setDropdown = side === 'A' ? this.showDropdownA : this.showDropdownB;

    setLoading.set(true);

    this.countryService.searchByCountryName(query).subscribe({
      next: (countries) => {
        setResults.set(countries.slice(0, 8));
        setLoading.set(false);
        setDropdown.set(countries.length > 0);
      },
      error: () => {
        setResults.set([]);
        setLoading.set(false);
        setDropdown.set(false);
      },
    });
  }

  selectCountry(country: Country, side: 'A' | 'B'): void {
    if (side === 'A') {
      this.selectedA.set(country);
      this.queryA.set(country.name);
      this.showDropdownA.set(false);
      this.resultsA.set([]);
    } else {
      this.selectedB.set(country);
      this.queryB.set(country.name);
      this.showDropdownB.set(false);
      this.resultsB.set([]);
    }
  }

  clearCountry(side: 'A' | 'B'): void {
    if (side === 'A') {
      this.selectedA.set(null);
      this.queryA.set('');
      this.resultsA.set([]);
      this.showDropdownA.set(false);
    } else {
      this.selectedB.set(null);
      this.queryB.set('');
      this.resultsB.set([]);
      this.showDropdownB.set(false);
    }
  }
}
