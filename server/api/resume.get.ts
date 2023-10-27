import { prisma } from '~/prisma/client'


export default defineEventHandler(async (e) => {
	const name = getQuery(e).name as string
	if (!name) {
		return sendFail('缺少 name');
	}

	const user = await prisma.user.findFirst({
		where: { name }
	})

	if (!user) {
		return sendFail('缺少 name');
	}

	// @ts-ignore
	delete user.password

	return sendSuccess(user)
})