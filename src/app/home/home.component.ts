import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon/pokemon.model';
import { DataService } from '../services/data.service';
import { PokemonApiService } from '../services/pokemon-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemonListSubscription: Subscription = new Subscription();
  selectedPokemonSubscription: Subscription = new Subscription();
  selectedPageSubscription: Subscription = new Subscription();
  limitPerPageSubscription: Subscription = new Subscription();
  favoritePokemonsSubscription: Subscription = new Subscription();
  userThemeSubscription: Subscription = new Subscription();

  totalPokemonsCount!: number;
  pokemonList!: any[];
  pokemons!: Pokemon[];
  abilities!: any;
  selectedPokemon!: Pokemon;
  favoritePokemons: Pokemon[] = [];

  page!: number;
  totalPages!: number;
  limit!: number;
  selectedPage!: number;
  selectedTheme!: string;

  constructor(
    private pokemonService: PokemonApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.selectedPokemonSubscription = this.dataService
      .getSelectedPokemon()
      .pipe()
      .subscribe((res: Pokemon) => (this.selectedPokemon = res));

    this.selectedPageSubscription = this.dataService
      .getSelectedPage()
      .pipe()
      .subscribe((res: number) => (this.selectedPage = res));

    this.limitPerPageSubscription = this.dataService
      .getLimitPerPage()
      .pipe()
      .subscribe((res: number) => (this.limit = res));

    this.favoritePokemonsSubscription = this.dataService
      .getUserFavoritePokemons()
      .pipe()
      .subscribe((res: any) => (this.favoritePokemons = res));

    this.userThemeSubscription = this.dataService
      .getUserTheme()
      .pipe()
      .subscribe((res: any) => (this.selectedTheme = res));

    this.pokemonListSubscription = this.triggerAPICall();
  }

  ngOnDestroy(): void {
    this.pokemonListSubscription.unsubscribe();
    this.selectedPokemonSubscription.unsubscribe();
    this.selectedPageSubscription.unsubscribe();
    this.limitPerPageSubscription.unsubscribe();
    this.favoritePokemonsSubscription.unsubscribe();
  }

  selectPokemon(pokemon: Pokemon): void {
    this.dataService.setSelectedPokemon(pokemon);
  }

  savePokemon(pokemon: Pokemon): void {
    if (this.isAlreadyFavorite(pokemon)) {
      const index = this.favoritePokemons.findIndex(
        (favoritePokemon: Pokemon) => pokemon.name === favoritePokemon.name
      );
      this.favoritePokemons.splice(index, 1);
    } else {
      this.favoritePokemons.push(pokemon);
    }
    this.dataService.setUserFavoritePokemons(this.favoritePokemons);
  }

  selectPage(page: number): void {
    this.dataService.setSelectedPage(page);
  }

  isAlreadyFavorite(pokemon: Pokemon): boolean {
    return this.favoritePokemons.some(
      (favoritePokemon: Pokemon) => pokemon.name === favoritePokemon.name
    );
  }

  triggerAPICall(): any {
    return this.pokemonService
      .getAllPokemons()
      .pipe(
        map((res: any) => {
          this.totalPokemonsCount = res.count;
          this.totalPages = Math.floor(this.totalPokemonsCount / this.limit);
          this.pokemonList = res.results;
          return this.pokemonList;
        }),
        switchMap((pokemons: any) => this.pokemonService.getPokemons(pokemons)),
        map((res: any) => {
          this.pokemons = res.map(
            (pokemon: any) =>
              new Pokemon(
                pokemon.sprites.front_default,
                pokemon.name,
                pokemon.height,
                pokemon.weight,
                pokemon.abilities
              )
          );
          return res;
        })
      )
      .subscribe();
  }
}
