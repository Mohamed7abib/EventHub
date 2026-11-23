import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Evenements } from '../../services/evenements';
import { Reservations } from '../../services/reservations';
import { Session } from '../../services/session';
import { EtatPlacesPipe } from '../../pipes/etat-places.pipe';

@Component({
  selector: 'app-detail-evenement',
  standalone: true,
  imports: [DatePipe, RouterLink, EtatPlacesPipe],
  templateUrl: './detail-evenement.html',
  styleUrl: './detail-evenement.css',
})
export class DetailEvenement {
  readonly id = input.required<string>();
  private readonly evenements = inject(Evenements);
  private readonly reservations = inject(Reservations);
  private readonly session = inject(Session);

  readonly evenement = computed(() => {
    const id = Number(this.id());
    return Number.isInteger(id) ? this.evenements.getEvenement(id) : undefined;
  });

  readonly placesRestantes = computed(() => {
    const evenement = this.evenement();
    return evenement ? this.evenements.placesRestantes(evenement) : 0;
  });

  readonly tauxRemplissage = computed(() => {
    const evenement = this.evenement();
    if (!evenement || evenement.capacite === 0) return 0;
    return Math.round((evenement.placesReservees / evenement.capacite) * 100);
  });

  readonly estPasse = computed(() => {
    const evenement = this.evenement();
    return evenement ? this.evenements.estPasse(evenement) : false;
  });

  readonly dejaReserve = computed(() => {
    const evenement = this.evenement();
    const utilisateur = this.session.utilisateur();
    if (!evenement || !utilisateur) return false;
    return this.reservations.reservationsUtilisateur(utilisateur.email)
      .some((reservation) => reservation.evenementId === evenement.id);
  });
}
