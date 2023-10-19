import { useStorage, createGlobalState } from '@vueuse/core'

const defineKey = (value: string) => `contour-user-${value}`

const INFO_KEY = defineKey('info')
const TOKEN_KEY = defineKey('token')
const EXPIRED_KEY = defineKey('expired')

export const useUserInfo = createGlobalState(() => {

	const user = useStorage<User | Record<string, string>>(INFO_KEY, {})
	const token = useStorage(TOKEN_KEY, '')
	const expired = useStorage(EXPIRED_KEY, 0)

	const logging = (u: User, auth: Authorization) => {
		user.value = u
		token.value = auth.token
		expired.value = auth.exp
	}

	const logged = () :boolean => {		
		if (!token.value) {
			return false
		}
		if (timeExpired(expired.value)) {
			return false
		}

		console.log(user);
		

		return true
	}

	return {
		user,
		token,
		expired,
		logging,
		logged
	}
})