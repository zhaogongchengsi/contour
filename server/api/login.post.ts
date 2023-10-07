import { isUserInfo } from "~/composables/schema"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const { success, message } = await isUserInfo(body)
	if (!success) {
		return sendFail(message)
	}

	if (!await verifyCaptcha(body.id, body.code)) {
		return sendFail('验证码错误或过期')
	}


	// todo: 验证邮箱真实性





	console.log(body)

	return sendSuccess<any>(body)
})
