
const blacklist = ['auth']

export default defineEventHandler(async (event) => {

	const paths = event.path.split('/')

	for (const item of blacklist) {
		if (!paths.includes(item)) {
			return
		}
	}

	const authStr = getRequestHeader(event, 'Authorization')?.trim()

	if (!authStr) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	const [, token] = authStr.split(' ')

	try {
		const { data } = await verifyToken(token) as { exp: number; data: { uuid: string, id: string }; iat: number; iss: string }

		event.context.auth = {
			uuid: data.uuid,
			id: data.id
		}

	} catch (err: any) {
		throw createError({
			statusCode: 401,
			statusMessage: err.message,
		})
	}
})
