import { useStorage, createGlobalState } from '@vueuse/core'

const defineKey = (value: string) => `contour-user-${value}`

export const INFO_KEY = defineKey('info')
export const TOKEN_KEY = defineKey('token')
export const EXPIRED_KEY = defineKey('expired')

export const useUserInfo = createGlobalState(() => {

	const user = useStorage<User | any>(INFO_KEY, {})
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

		return true
	}


	const logout = () => {
		user.value = {}
		token.value = ''
		expired.value = 0
	}

	return {
		user,
		token,
		expired,
		logging,
		logged,
		logout
	}
})
