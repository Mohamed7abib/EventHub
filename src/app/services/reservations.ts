import { Injectable, inject, signal } from '@angular/core';
import { Reservation } from '../modeles/reservation';
import { Evenements } from './evenements';

@Injectable({ providedIn: 'root' })
export class Reservations {
  private readonly evenements = inject(Evenements);
  private readonly _reservations = signal<Reservation[]>([]);
  readonly reservations = this._reservations.asReadonly();

  reserver(reservation: Omit<Reservation, 'id' | 'dateReservation'>): boolean {
    const evenement = this.evenements.getEvenement(reservation.evenementId);
    if (!evenement || reservation.nbPlaces < 1) return false;

    const placesRestantes = this.evenements.placesRestantes(evenement);
    if (placesRestantes < reservation.nbPlaces) return false;

    const nouvelleReservation: Reservation = {
      ...reservation,
      id: this.prochainId(),
      dateReservation: new Date().toISOString(),
    };
    this._reservations.update((reservations) => [...reservations, nouvelleReservation]);
    this.evenements.modifier({
      ...evenement,
      placesReservees: evenement.placesReservees + reservation.nbPlaces,
    });
    return true;
  }

  annuler(id: number): void {
    const reservation = this._reservations().find((item) => item.id === id);
    if (!reservation) return;

    this._reservations.update((reservations) => reservations.filter((item) => item.id !== id));
    const evenement = this.evenements.getEvenement(reservation.evenementId);
    if (evenement) {
      this.evenements.modifier({
        ...evenement,
        placesReservees: Math.max(0, evenement.placesReservees - reservation.nbPlaces),
      });
    }
  }

  reservationsUtilisateur(email: string): Reservation[] {
    return this._reservations().filter((reservation) => reservation.email === email);
  }

  nombreReservations(email: string): number {
    return this.reservationsUtilisateur(email).length;
  }

  private prochainId(): number {
    return this._reservations().reduce((maximum, reservation) => Math.max(maximum, reservation.id), 0) + 1;
  }
}
