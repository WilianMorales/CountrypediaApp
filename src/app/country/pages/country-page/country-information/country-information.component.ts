import { Component, computed, input, signal, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Country } from '../../../interfaces/country.interfaces';

@Component({
  selector: 'app-country-information',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent implements OnInit, OnDestroy {
  country = input.required<Country>();

  currentYear = computed(() => new Date().getFullYear());

  now = signal(new Date());
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.now.set(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private parseTimezoneOffset(tz: string): number {
    const normalized = tz.replace('−', '-').trim();
    const match = normalized.match(/^UTC([+-])(\d{1,2})(?::?(\d{2}))?$/);

    if (!match) return 0;

    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3] ?? '0', 10);

    return sign * (hours * 60 + minutes);
  }

  private getTimeParts(tz: string) {
    const now = this.now();

    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();

    const utcTotalMinutes = utcHours * 60 + utcMinutes;
    const offsetMinutes = this.parseTimezoneOffset(tz);

    const localTotalMinutes = (utcTotalMinutes + offsetMinutes + 1440) % 1440;

    const hours = Math.floor(localTotalMinutes / 60);
    const minutes = localTotalMinutes % 60;
    const seconds = utcSeconds;

    return { hours, minutes, seconds };
  }

  getHours(tz: string): number {
    return this.getTimeParts(tz).hours;
  }

  getMinutes(tz: string): number {
    return this.getTimeParts(tz).minutes;
  }

  getSeconds(tz: string): number {
    return this.getTimeParts(tz).seconds;
  }

  formatCurrency(currency: { name: string; symbol: string }): string {
    return currency.symbol ? `(${currency.symbol}) ${currency.name}` : currency.name;
  }
}
