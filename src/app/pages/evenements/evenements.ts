import { Component, inject, signal } from '@angular/core';
import { Categorie } from '../../modeles/categorie';
import { Evenements } from '../../services/evenements';
import { CarteEvenement } from '../../composants/carte-evenement/carte-evenement';
import { FiltreEvenementsPipe } from '../../pipes/filtre-evenements.pipe';
import { TriEvenementsPipe, TriEvenements } from '../../pipes/tri-evenements.pipe';

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [CarteEvenement, FiltreEvenementsPipe, TriEvenementsPipe],
  templateUrl: './evenements.html',
  styleUrl: './evenements.css',
})
export class EvenementsPage {
  readonly evenements = inject(Evenements);
  readonly recherche = signal('');
  readonly categorie = signal<Categorie | 'toutes'>('toutes');
  readonly tri = signal<TriEvenements>('date-asc');
  readonly idsFavoris = signal<number[]>([]);

  basculerFavori(id: number): void {
    this.idsFavoris.update((ids) =>
      ids.includes(id) ? ids.filter((favoriId) => favoriId !== id) : [...ids, id],
    );
  }
}
