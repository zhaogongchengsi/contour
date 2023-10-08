
declare interface AppResponse<T> {
	code: 0 | 1,
	data: T | null,
	message: string
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
	createdAt: string;
	email: string;
	id: number;
	name: null;
	password: string;
	state: number;
	uid: string;
	updatedAt: null;
}
