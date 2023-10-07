
declare interface AppResponse<T> {
	code: 0 | 1,
	data: T | null,
	message: string
}
