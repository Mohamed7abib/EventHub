import { Injectable, signal } from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';

@Injectable({ providedIn: 'root' })
export class Session {
  private readonly _utilisateur = signal<Utilisateur | null>(null);
  readonly utilisateur = this._utilisateur.asReadonly();

  connecter(utilisateur: Utilisateur): void {
    this._utilisateur.set({ ...utilisateur });
  }

  deconnecter(): void {
    this._utilisateur.set(null);
  }

  estOrganisateur(): boolean {
    return this._utilisateur()?.role === 'organisateur';
  }

  estConnecte(): boolean {
    return this._utilisateur() !== null;
  }
}
