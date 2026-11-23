import { Pipe, PipeTransform } from '@angular/core';
import { Evenement } from '../modeles/evenement';

export type TriEvenements = 'date-asc' | 'date-desc' | 'places';

@Pipe({ name: 'triEvenements', standalone: true, pure: true })
export class TriEvenementsPipe implements PipeTransform {
  transform(evenements: readonly Evenement[], tri: TriEvenements = 'date-asc'): Evenement[] {
    const resultat = evenements.map((evenement) => ({ ...evenement }));
    if (tri === 'date-desc') {
      return resultat.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    if (tri === 'places') {
      return resultat.sort((a, b) =>
        (b.capacite - b.placesReservees) - (a.capacite - a.placesReservees),
      );
    }
    return resultat.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
