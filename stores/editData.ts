
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { AvatarUri, ContactInfo } from '~/types'

const defineStorageKey = (key: string) => `contour-edit-${key}`

export const useEditDataStore = defineStore('editData', () => {

	const route = useRoute()
	const name = useStorage<string>(defineStorageKey('name'), route.params.name as string)
	const setName = (n: string) => (name.value = n)

	const background = useStorage(defineStorageKey('background'), '#fff')
	const setBackground = (b: string) => (background.value = b)

	const avatar = useStorage<AvatarUri>(defineStorageKey('avatar'), 'emoji:😎')
	const setAvatar = (a: AvatarUri) => (avatar.value = a)

	const styles = useStorage<string[]>(defineStorageKey('styles'), [])
	const setStyles = (s: string[]) => (styles.value = s)

	const description = useStorage<string>(defineStorageKey('description'), '这是一条非常牛逼的自我描述')
	const setDescription = (d: string) => (description.value = d)

	const contacts = useStorage<ContactInfo[]>(defineStorageKey('contact'), [])

	const createContact = (): ContactInfo => {
		return {
			value: '',
			type: 'phone'
		}
	}

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
		setDescription,
		contacts,
		createContact
	}
})