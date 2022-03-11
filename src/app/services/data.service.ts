import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  favoritePokemons$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedPokemon$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  selectedPage$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  userTheme$: BehaviorSubject<any> = new BehaviorSubject<any>(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );
  limitPerPage$: BehaviorSubject<any> = new BehaviorSubject<any>(20);

  constructor() {}
  /**
   * Favorite Pokemons
   */

  getUserFavoritePokemons(): Observable<any> {
    return this.favoritePokemons$.asObservable();
  }

  setUserFavoritePokemons(pokemon: Pokemon[]): void {
    this.favoritePokemons$.next(pokemon);
  }

  /**
   * User Theme
   */

  getUserTheme(): Observable<any> {
    return this.userTheme$.asObservable();
  }

  setUserTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.userTheme$.next(theme);
  }
  /**
   * Selected Pokemon
   */

  getSelectedPokemon(): Observable<any> {
    return this.selectedPokemon$.asObservable();
  }

  setSelectedPokemon(pokemon: Pokemon): void {
    console.log(pokemon);
    this.selectedPokemon$.next(pokemon);
  }
  /**
   * Selected page for async table
   */

  getSelectedPage(): Observable<any> {
    return this.selectedPage$.asObservable();
  }

  setSelectedPage(page: any): void {
    this.selectedPage$.next(page);
  }

  /**
   * Limit page for API request
   */

  getLimitPerPage(): Observable<any> {
    return this.limitPerPage$.asObservable();
  }

  setLimitPerPage(limit: number): void {
    localStorage.setItem('limit', limit.toString());
    this.limitPerPage$.next(limit);
  }
}
