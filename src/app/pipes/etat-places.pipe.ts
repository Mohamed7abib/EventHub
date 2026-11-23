import { Pipe, PipeTransform } from '@angular/core';
import { Evenement } from '../modeles/evenement';

@Pipe({ name: 'etatPlaces', standalone: true, pure: true })
export class EtatPlacesPipe implements PipeTransform {
  transform(evenement: Evenement, seuil?: number): string;
  transform(placesRestantes: number, seuil?: number): string;
  transform(valeur: Evenement | number, seuil = 5): string {
    const placesRestantes = typeof valeur === 'number'
      ? valeur
      : Math.max(0, valeur.capacite - valeur.placesReservees);
    if (placesRestantes === 0) return 'Complet';
    if (placesRestantes === 1) return 'Dernière place !';
    if (placesRestantes <= seuil) return `Plus que ${placesRestantes} places`;
    return `${placesRestantes} places disponibles`;
  }
}
