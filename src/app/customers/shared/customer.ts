export interface Customer {
  id?: string;
  name: string;
  characterClass?: string;
  level: number;
  hp: number;
  mana: number;
  attack: number;
  items: string[];
}
