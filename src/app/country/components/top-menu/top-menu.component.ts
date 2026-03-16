import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Por Capital',
      icon: 'fa-solid fa-building-columns',
      route: 'by-capital',
    },
    {
      label: 'Por País',
      icon: 'fa-regular fa-flag',
      route: 'by-country'
    },
    {
      label: 'Por Region',
      icon: 'fa-solid fa-earth-americas',
      route: 'by-region'
    },
    {
      label: 'Comparar País',
      icon: 'fa-solid fa-scale-balanced',
      route: 'by-language'
    },
    {
      label: 'Por Idioma',
      icon: 'fa-solid fa-language',
      route: 'by-language'
    },
    {
      label: 'Favoritos',
      icon: 'fa-solid fa-star',
      route: 'by-language'
    }
  ];
}
