import { isUserInfo } from "~/composables/schema"
import { prisma } from "~/prisma/client"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const { success, message } = await isUserInfo(body)
	if (!success) {
		return sendFail(message)
	}

	if (isPro() && !await verifyCaptcha(body.id, body.code)) {
		return sendFail('验证码错误或过期')
	}
	

	const user = await prisma.user.findFirst({
		where: {
			account: body.account,
			name: body.name
		}
	})

	if (!user) {
		return sendFail('用户不存在')
	}

	if (!decrypt(body.password, user.password as any)) {
		return sendFail('密码错误')
	}

	const { token, exp } = issueToken({
		uuid: user.uid!,
		id: user.id,
	})

	// @ts-ignore
	delete user.password

	return sendSuccess<AppUserResponse>({
		authorization: {
			token,
			exp
		},
		user: user as unknown as User
	})
})
