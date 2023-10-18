
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { AvatarUri, CardConfig, ContactInfo, UploadInfo } from '~/types'

const defineStorageKey = (key: string) => `contour-edit-${key}`

export const useEditDataStore = defineStore('editData', () => {

	const route = useRoute()
	const name = useStorage<string>(defineStorageKey('name'), route.params.name as string)
	const setName = (n: string) => (name.value = n)
	setName(route.params.name as string)

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

	const cards = useStorage<CardConfig[]>(defineStorageKey('cards'), [
		{
			id: 1,
			icon: {
				label: "知乎",
				name: "zhihu",
				image: "/icons/zhihu.svg",
				background: "#0c6dfe"
			},
			size: {
				col: 1,
				row: 1
			},
			link: '#',
			buttonStyle: 'windows',
			image: '',
			background: '#fff'
		},
		{
			id: 2,
			icon: {
				label: "知乎",
				name: "zhihu",
				image: "/icons/zhihu.svg",
				background: "#0c6dfe"
			},
			size: {
				col: 2,
				row: 2
			},
			link: '#',
			buttonStyle: 'windows',
			image: '',
			background: '#f12342'
		},
		{
			id: 3,
			icon: {
				label: "知乎",
				name: "zhihu",
				image: "/icons/zhihu.svg",
				background: "#0c6dfe"
			},
			size: {
				col: 4,
				row: 2
			},
			link: '#',
			buttonStyle: 'windows',
			image: '',
			background: '#fff234'
		}
	])

	const createCard = (config: CardConfig) => {
		cards.value.push(config)
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
		createCard
	}
})
