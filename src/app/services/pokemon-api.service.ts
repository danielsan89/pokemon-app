import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Ability } from '../models/pokemon/ability.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient, private dataService: DataService) {}

  getLimit(): any {
    let limit = 0;
    this.dataService
      .getLimitPerPage()
      .pipe()
      .subscribe((res: any) => (limit = res))
      .unsubscribe();
    return limit;
  }

  getSelectedPage(): any {
    let selectedPage = 0;
    this.dataService
      .getSelectedPage()
      .pipe()
      .subscribe((res: any) => (selectedPage = res))
      .unsubscribe();
    return selectedPage;
  }

  getAllPokemons(): Observable<any> {
    const limit = this.getLimit().toString();
    const offSet = (this.getSelectedPage() * limit).toString();
    const params = new HttpParams().set('limit', limit).set('offset', offSet);

    return this.http.get(this.POKEMON_API_URL, { params });
  }

  getPokemons(pokemonList: any[]): Observable<any> {
    const reqArray = pokemonList.map((pokemonItem: any) =>
      this.http.get(pokemonItem.url).pipe(
        map((res: any) => {
          const abilitiesFormatted = this.getAbilities(res.abilities);
          res = {
            ...res,
            abilities: abilitiesFormatted,
          };
          console.log(res);
          return res;
        })
      )
    );

    return forkJoin(reqArray);
  }

  private getAbilities(abilities: any): any {
    const abilitiesReq = abilities.map((ability: any) =>
      this.http
        .get(ability.ability.url)
        .pipe(first())
        .subscribe((res: any) => {
          const name = res.name;
          const effect = res.effect_entries.find(
            (entrie: any) => entrie.language.name === 'en'
          );
          const abilityFormatted = new Ability(name, effect);
          console.log(abilityFormatted);
        })
    );
    return abilitiesReq;
  }
}
