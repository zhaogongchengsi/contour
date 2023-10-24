
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { AvatarUri, CardConfig, ContactInfo } from '~/types'

const defineStorageKey = (key: string) => `contour-edit-${key}`

export const useEditDataStore = defineStore('editData', () => {

	const name = useStorage<string>(defineStorageKey('name'), '')
	const setName = (n: string) => (name.value = n)

	const background = useStorage(defineStorageKey('background'), '#18A058')
	const setBackground = (b: string) => (background.value = b)

	const color = useStorage<string>(defineStorageKey('color'), '#fff')

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

	const cardCurredId = useStorage<number>(defineStorageKey('id'), 0)
	const getId = () => (cardCurredId.value + 1)

	const cards = useStorage<CardConfig[]>(defineStorageKey('cards'), [])

	const createCard = (config: CardConfig) => {
		cards.value.push(config)
	}


	const save = async () => {

		console.log('保存');

		const res = await noteSave({
			name: name.value,
			color: color.value,
			background: background.value,
			avatar: avatar.value,
			styles: styles.value,
			description: description.value,
			contacts: contacts.value,
			cards: cards.value
		})

		console.log(res);

	}

	return {
		name,
		setName,
		background,
		setBackground,
		color,
		avatar,
		setAvatar,
		styles,
		setStyles,
		description,
		setDescription,
		contacts,
		createContact,
		cards,
		createCard,
		save,
		cardCurredId,
		getId
	}
})
