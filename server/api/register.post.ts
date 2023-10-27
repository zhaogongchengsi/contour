import { UserInfoScheme, isUserInfo } from '~/composables/schema'
import { prisma } from '~/prisma/client'

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

		const oldUser = await prisma.user.findFirst({
			where: {
				account: body.account,
				name: body.name
			}
		})

		if (oldUser) {
			return sendFail('用户已存在')
		}

		const user = await prisma.user.create({
			data: {
				account: body.account,
				name: body.name,
				password: encrypt(body.password),
			}
		})

		// @ts-ignore
		delete user.password

		return sendSuccess(user, '注册成功')

	} catch (err: any) {
		return sendFail('注册失败')
	}
})
