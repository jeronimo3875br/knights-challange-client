import { IDefaultDTO } from "@/dtos/IDefaultDTO";

export interface IKnightWeapon extends IDefaultDTO {
  name: string;
  mod: number;
  attr?: string;
  equipped: boolean;
}

export interface IKnightAttributes extends IDefaultDTO {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface IKnight extends IDefaultDTO {
  name: string;
  nickname: string;
  birthday: string;
  weapons: IKnightWeapon[];
  attributes: IKnightAttributes;
  keyAttribute: string;
  image?: string;
  isHero?: boolean;
  experience?: number;
  attack?: string;
}
