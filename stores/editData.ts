
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const defineStorageKey = (key: string) => `contour-edit-${key}`

export const useEditDataStore = defineStore('editData', () => {

	const name = useStorage(defineStorageKey('name'), '')
	const setName = (n: string) => (name.value = n)

	const background = useStorage(defineStorageKey('background'), 'url(https://public-bg-1303828986.cos.ap-nanjing.myqcloud.com/java.png) no-repeat center center')
	const setBackground = (b: string) => (background.value = b)

	const avatar = useStorage(defineStorageKey('avatar'), 'emoji:😎')
	// const avatar = useStorage(defineStorageKey('avatar'), 'text:zhaozunhong')
	// const avatar = useStorage<AvatarUri>(defineStorageKey('avatar'), 'url:https://public-bg-1303828986.cos.ap-nanjing.myqcloud.com/java.png')
	const setAvatar = (a: string) => (avatar.value = a)


	return {
		name,
		setName,
		background,
		setBackground,
		avatar,
		setAvatar
	}
})