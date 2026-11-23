import { Pipe, PipeTransform } from '@angular/core';
import { Categorie } from '../modeles/categorie';
import { Evenement } from '../modeles/evenement';

@Pipe({ name: 'filtreEvenements', standalone: true, pure: true })
export class FiltreEvenementsPipe implements PipeTransform {
  transform(
    evenements: readonly Evenement[],
    recherche = '',
    categorie: Categorie | 'toutes' = 'toutes',
  ): Evenement[] {
    const texte = recherche.trim().toLocaleLowerCase();
    return evenements.filter((evenement) =>
      (categorie === 'toutes' || evenement.categorie === categorie) &&
      (!texte ||
        evenement.titre.toLocaleLowerCase().includes(texte) ||
        evenement.club.toLocaleLowerCase().includes(texte)),
    );
  }
}
