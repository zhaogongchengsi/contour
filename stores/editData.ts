
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { AvatarUri } from '~/types'

const defineStorageKey = (key: string) => `contour-edit-${key}`

export const useEditDataStore = defineStore('editData', () => {

	const name = useStorage(defineStorageKey('name'), '')
	const setName = (n: string) => (name.value = n)

	const background = useStorage(defineStorageKey('background'), '#fff')
	const setBackground = (b: string) => (background.value = b)

	const avatar = useStorage<AvatarUri>(defineStorageKey('avatar'), 'emoji:😎')
	const setAvatar = (a: AvatarUri) => (avatar.value = a)

	const styles = useStorage<string[]>(defineStorageKey('styles'), [])
	const setStyles = (s: string[]) => (styles.value = s)

	return {
		name,
		setName,
		background,
		setBackground,
		avatar,
		setAvatar,
		styles,
		setStyles
	}
})