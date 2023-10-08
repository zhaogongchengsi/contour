
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const defineStorageKey = (key: string) => `contour-edit-${key}`

export const useEditDataStore = defineStore('editData', () => {

	const name = useStorage(defineStorageKey('name'), '')
	const setName = (n: string) => (name.value = n)

	const background = useStorage(defineStorageKey('background'), '')
	const setBackground = (b: string) => (background.value = b)


	return {
		name,
		setName,
		background,
		setBackground
	}
})