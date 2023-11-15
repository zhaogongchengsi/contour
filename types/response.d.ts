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

declare interface ResponseResume extends Resume {
  cards: ResponseCard[];
}

declare interface ResponseCard extends Card {
  createdAt: string;
  updatedAt: null;
  userId: string;
}
