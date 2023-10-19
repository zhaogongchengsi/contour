import { useStorage } from '@vueuse/core'

const defineKey = (value: string) => `contour-user-${value}`

export const useUserInfo = defineStore('user-info', () => {
	const user = useStorage<User | null>(defineKey('info'), null)
	const token = useStorage(defineKey('token'), '')
	const expired = useStorage(defineKey('expired'), 0)

	const logging = (u: User, auth: Authorization) => {
		user.value = u
		token.value = auth.token
		expired.value = auth.exp
	}

	const logged = () :boolean => {
		if (!token) {
			return false
		}

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