import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'country',
    loadChildren: () =>  import('./country/country.routes')
  },
  {
    path: '**',
    component: Error404PageComponent
  }
];
