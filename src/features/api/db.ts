export interface CardBase {
  title: string;
  provider: string;
  balance: number;
  card_number: number;
  name: string;
}

export interface CardCreate extends CardBase {}

export interface Card extends CardBase {
  id: number;
  owner_id: number;
}

export interface UserBase {
  name: string;
  email: string;
}
export interface UserCreate extends UserBase {
  password: string;
}
export interface AuthUser extends UserBase {
  id: number;
  cards: Card[];
}
export interface User extends AuthUser {
  hashed_password: string;
}
