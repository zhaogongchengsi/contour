declare interface AppResponse<T> {
  code: 0 | 1;
  data: T | null;
  message: string;
}

declare interface AppUserResponse {
  authorization: Authorization;
  user: User;
}

declare interface Authorization {
  exp: number;
  token: string;
}

declare interface User {
  account: string;
  avatar: string;
  id: number;
  name: string;
  uid: string;
}

declare interface BgItem {
  url: string;
  name: string;
  size: string;
}

declare interface Resume {
  avatar: string;
  background: string;
  cards: Card[];
  color: string;
  contact: string;
  description: null;
  name: string;
  state: number;
  styles: string;
}

declare interface Card {
  background: string;
  buttonStyle: "windows" | "android" | "apple";
  createdAt: string;
  icon: string;
  id: number;
  image: string;
  link: string;
  size: `${number}-${number}`;
  sort: number;
  updatedAt: null;
  userId: string;
}
