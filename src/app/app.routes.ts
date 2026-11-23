import { Routes } from '@angular/router';
import { EvenementsPage } from './pages/evenements/evenements';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'evenements' },
  { path: 'evenements', component: EvenementsPage },
  {
    path: 'evenements/:id',
    loadComponent: () =>
      import('./pages/detail-evenement/detail-evenement')
        .then((module) => module.DetailEvenement),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-404/page-404')
        .then((module) => module.Page404),
  },
];
