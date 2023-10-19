import { useStorage } from '@vueuse/core'
import { User } from '~/types'

const defineKey = (value: string) => `contour-user-${value}`

export const useUserInfo = defineStore('user-info', () => {
	const user = useStorage<User | null>(defineKey('info'), {})
	const token = useStorage(defineKey('token'), '')
	const expired = useStorage(defineKey('expired'), 0)


	const logged = (u: User, auth: Authorization) => {
		user.value = u
		token.value = auth.token
		expired.value = auth.exp
	}

	return {
		user,
		token,
		expired,
		logged
	}
})