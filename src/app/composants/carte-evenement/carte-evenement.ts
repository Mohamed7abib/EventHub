import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Evenement } from '../../modeles/evenement';
import { EtatPlacesPipe } from '../../pipes/etat-places.pipe';

@Component({
  selector: 'app-carte-evenement',
  standalone: true,
  imports: [DatePipe, EtatPlacesPipe, RouterLink],
  templateUrl: './carte-evenement.html',
  styleUrl: './carte-evenement.css',
})
export class CarteEvenement {
  readonly evenement = input.required<Evenement>();
  readonly favoriChange = output<number>();
  readonly favoris = input<readonly number[]>([]);

  estFavori(): boolean {
    return this.favoris().includes(this.evenement().id);
  }

  estPasse(): boolean {
    return new Date(this.evenement().date).getTime() < Date.now();
  }

  basculerFavori(): void {
    this.favoriChange.emit(this.evenement().id);
  }
}
