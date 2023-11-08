import { ContactInfo } from ".";

declare ResponseStatusCode = 0 | 1 | 2 | 3;
declare interface AppResponse<T> {
  code: ResponseStatusCode;
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
  contact: ContactInfo[];
  description?: string;
  name: string;
  state: number;
  styles?: CardButtonStyle;
}

declare interface Card {
  background: string;
  buttonStyle: "windows" | "android" | "apple";
  createdAt: string;
  icon: string;
  uid: string;
  image: string;
  link: string;
  size: `${number}-${number}`;
  sort: number;
  updatedAt: null;
  userId: string;
}
