import { useFetch, isClient } from '@vueuse/core'

export function useVerifyCode() {
	const url = ref('/api/security')
	const { isFetching, execute, data } = useFetch(url, { immediate: false, refetch: true }).json()

	const refresh = (id?: string) => {
		if (!isClient || !id) {
			return
		}
		url.value = `${url.value}?id=${id}`
	}

	const exe = async () => {
		await execute()
	}

	return {
		data,
		execute: exe,
		loading: isFetching,
		refresh
	}
}

export const loginApi = (body: UserInfoScheme) => $fetch<AppResponse<UserInfoScheme>>('/api/login', { method: 'post', body: body })