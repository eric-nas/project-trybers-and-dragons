import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _energy: Energy;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _dexterity: number;
  private _defense: number;
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);   
    this._archetype = new Mage(name);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10) };
    this._race = new Elf(this._name, this._dexterity);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get name(): string {
    return this._name;
  }

  get race(): Race {
    return this._race;
  }

  get lifePoints(): number {
    return this._lifePoints;
  } 

  get dexterity(): number {
    return this._dexterity;
  }

  get strength(): number {
    return this._strength;
  } 

  get energy(): Energy {
    const energyInfo = { ...this._energy };
    return energyInfo;
  }

  get defense(): number {
    return this._defense;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage <= 0) {
      this._lifePoints -= 1;
    } else {
      this._lifePoints -= damage;
    }

    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this._lifePoints;
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    this._lifePoints = this._maxLifePoints;
  }

  special(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength * this._defense);
  }
}