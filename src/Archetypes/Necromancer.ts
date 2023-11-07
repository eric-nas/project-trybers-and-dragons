import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  private _energyType: EnergyType;
  private static _instancesCount = 0;

  constructor(n: string) {
    super(n);
    this._energyType = 'mana';
    Necromancer._instancesCount += 1;
  }

  get name(): string {
    return this.name;
  }

  get special(): number {
    return this.special;
  }

  get cost(): number {
    return this.cost;
  }

  static createdArchetypeInstances(): number {
    return Necromancer._instancesCount;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }
}