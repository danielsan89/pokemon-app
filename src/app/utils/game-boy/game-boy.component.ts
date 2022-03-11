import { Component, Input, OnChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon.model';

@Component({
  selector: 'app-game-boy',
  templateUrl: './game-boy.component.html',
  styleUrls: ['./game-boy.component.scss'],
})
export class GameBoyComponent implements OnChanges {
  @Input() pokemon!: Pokemon;
  constructor() {}

  ngOnChanges(): void {
    console.log(this.pokemon);
  }
}
