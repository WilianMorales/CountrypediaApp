import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobeComponent } from "../globe/globe.component";

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, GlobeComponent],
  templateUrl: './not-found.component.html',
  styles: `
    @keyframes slide-up {
      from { opacity:0; transform: translateY(12px); }
      to   { opacity:1; transform: translateY(0); }
    }

    .slide-up-1   { animation: slide-up .6s ease forwards .15s; opacity:0; }
    .slide-up-2   { animation: slide-up .6s ease forwards .4s;  opacity:0; }
    .slide-up-3   { animation: slide-up .6s ease forwards .65s; opacity:0; }
  `
})
export class NotFoundComponent {
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
