
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

	const description = useStorage<string>(defineStorageKey('description'), '这是一条非常牛逼的自我描述')
	const setDescription = (d: string) => (description.value = d)

	return {
		name,
		setName,
		background,
		setBackground,
		avatar,
		setAvatar,
		styles,
		setStyles,
		description,
		setDescription
	}
})