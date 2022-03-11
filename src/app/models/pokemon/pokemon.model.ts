import { Ability } from './ability.model';

export class Pokemon {
  picture: string;
  name: string;
  height: string;
  weight: string;
  listOfAbilities: any[];

  constructor(
    picture: string,
    name: string,
    path: string,
    weight: string,
    listOfAbilities: any[]
  ) {
    this.picture = picture;
    this.name = name;
    this.height = path;
    this.weight = weight;
    this.listOfAbilities = listOfAbilities;
  }
}
