
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
	account: string;
	id: number;
	name: null;
	avatar: string
	password: string;
	state: number;
	uid: string;
	updatedAt: null;
}

declare interface BgItem {
	url: string,
	name: string,
	size: string
}