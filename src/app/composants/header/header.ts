import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Reservations } from '../../services/reservations';
import { Session } from '../../services/session';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly session = inject(Session);
  readonly reservations = inject(Reservations);

  get nombreReservations(): number {
    const utilisateur = this.session.utilisateur();
    return utilisateur ? this.reservations.nombreReservations(utilisateur.email) : 0;
  }
}
