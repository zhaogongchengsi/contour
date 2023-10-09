
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { AvatarUri } from '~/types'

const defineStorageKey = (key: string) => `contour-edit-${key}`

export const useEditDataStore = defineStore('editData', () => {

	const name = useStorage(defineStorageKey('name'), '')
	const setName = (n: string) => (name.value = n)

	const background = useStorage(defineStorageKey('background'), 'url(https://public-bg-1303828986.cos.ap-nanjing.myqcloud.com/java.png) no-repeat center center')
	const setBackground = (b: string) => (background.value = b)

	const avatar = useStorage<AvatarUri>(defineStorageKey('avatar'), 'emoji:😎')
	const setAvatar = (a: AvatarUri) => (avatar.value = a)


	return {
		name,
		setName,
		background,
		setBackground,
		avatar,
		setAvatar
	}
})