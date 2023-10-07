import { UserInfoScheme, isUserInfo } from '~/composables/schema'
import { prisma } from '~/prisma/client'
import { randomUUID } from "uncrypto";

export default defineEventHandler(async (event) => {
	const body = await readBody<UserInfoScheme>(event)

	const { success, message } = await isUserInfo(body)
	if (!success) {
		return sendFail(message)
	}

	if (isPro() && !await verifyCaptcha(body.id, body.code)) {
		return sendFail('验证码错误或过期')
	}

	// todo: 验证邮箱真实性

	try {

		const user = await prisma.user.create({
			data: {
				email: body.account,
				password: encrypt(body.password),
				uid: randomUUID(),
			}
		})

		user.password = ''

		return sendSuccess(user, '注册成功')

	} catch (err: any) {
		return sendFail('注册失败')
	}
})
