import { isUserInfo } from '~/composables/schema'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const { success, value, message } = await isUserInfo(body)

	if (success) {
		return value
	}

	return {
		message
	}

})
