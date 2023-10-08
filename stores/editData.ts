
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'


const defineStorageKey = (key: string) => `contour-edit-${key}`

export const useEditDataStore = defineStore('editData', () => {

	const name = useStorage(defineStorageKey(name), '')

	return {
		name
	}
})