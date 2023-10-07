


export function sendSuccess<T>(data: T, message: string = '操作成功'): AppResponse<T> {
	return {
		code: 1,
		data,
		message
	}
}

export function sendFail(message: string = '操作失败'): AppResponse<null> {
	return {
		code: 0,
		data: null,
		message
	}
}