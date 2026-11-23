import { Injectable, signal } from '@angular/core';
import { EVENEMENTS_INITIAUX } from '../donnees/evenements';
import { Evenement } from '../modeles/evenement';

@Injectable({ providedIn: 'root' })
export class Evenements {
  private readonly _evenements = signal<Evenement[]>(EVENEMENTS_INITIAUX.map((evenement) => ({ ...evenement })));
  readonly evenements = this._evenements.asReadonly();

  getEvenement(id: number): Evenement | undefined {
    return this._evenements().find((evenement) => evenement.id === id);
  }

  getEvenementParId(id: number): Evenement | undefined {
    return this.getEvenement(id);
  }

  ajouter(evenement: Evenement): void {
    this._evenements.update((evenements) => [...evenements, { ...evenement }]);
  }

  modifier(evenementModifie: Evenement): void {
    this._evenements.update((evenements) =>
      evenements.map((evenement) => evenement.id === evenementModifie.id ? { ...evenementModifie } : evenement),
    );
  }

  supprimer(id: number): void {
    this._evenements.update((evenements) => evenements.filter((evenement) => evenement.id !== id));
  }

  placesRestantes(evenement: Evenement): number {
    return Math.max(0, evenement.capacite - evenement.placesReservees);
  }

  estPasse(evenement: Evenement, maintenant = new Date()): boolean {
    return new Date(evenement.date).getTime() < maintenant.getTime();
  }
}
