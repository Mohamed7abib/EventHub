import { Categorie } from './categorie';

export interface Evenement {
  id: number;
  titre: string;
  description: string;
  categorie: Categorie;
  club: string;
  date: string;
  lieu: string;
  capacite: number;
  placesReservees: number;
  gratuit: boolean;
}
