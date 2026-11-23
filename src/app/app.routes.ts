import { Routes } from '@angular/router';
import { EvenementsPage } from './pages/evenements/evenements';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'evenements' },
  { path: 'evenements', component: EvenementsPage },
];
