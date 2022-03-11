import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  favoritePokemonsSubscription: Subscription = new Subscription();
  selectedThemeSubscription: Subscription = new Subscription();
  selectedPokemonSubscription: Subscription = new Subscription();
  limitPerPageSubscription: Subscription = new Subscription();

  favoritePokemons!: Pokemon[];
  selectedPokemon!: Pokemon;
  selectedTheme!: string;
  themes: string[];
  limit!: number;
  pokemonIndex: number;

  // tslint:disable-next-line: variable-name
  constructor(private dataService: DataService) {
    this.themes = ['dark', 'light'];
    this.pokemonIndex = 0;
  }

  ngOnInit(): void {
    this.favoritePokemonsSubscription = this.dataService
      .getUserFavoritePokemons()
      .pipe()
      .subscribe((res: any) => (this.favoritePokemons = res));

    this.selectedThemeSubscription = this.dataService
      .getUserTheme()
      .pipe()
      .subscribe((res: any) => (this.selectedTheme = res));

    this.limitPerPageSubscription = this.dataService
      .getLimitPerPage()
      .pipe()
      .subscribe((res: any) => (this.limit = res));
  }

  ngOnDestroy(): void {
    this.selectedPokemonSubscription.unsubscribe();
    this.limitPerPageSubscription.unsubscribe();
    this.favoritePokemonsSubscription.unsubscribe();
  }

  changeUserTheme(theme: any): void {
    this.dataService.setUserTheme(theme);
  }

  nextPokemon(): void {
    this.pokemonIndex += 1;
  }

  previousPokemon(): void {
    this.pokemonIndex -= 1;
  }

  selectLimit(): void {
    this.dataService.setSelectedPage(0);
    this.dataService.setLimitPerPage(this.limit);
  }
}
