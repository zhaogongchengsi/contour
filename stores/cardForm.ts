import { defineStore } from 'pinia'
import { useToggle } from '@vueuse/core'
import { CardFormValue, IconInfo } from '~/types'

const initCardValue: CardFormValue = {
	size: {
		row: 1,
		col: 1
	},
	link: '',
	buttonStyle: 'windows',
	image: '',
	background: '#fff'
}

export const useCardFormModal = defineStore('card-form-modal', () => {

	const isShow = ref(false)
	const toggle = useToggle(isShow)
	const show = () => isShow.value = true
	const close = () => isShow.value = false
	const title = ref('')
	const curredIcon = ref<IconInfo>()

	const formValue = reactive<Omit<CardFormValue, "edit">>(initCardValue)

	const setBackground = (value: string) => {
		formValue.background = value
	}

	const reset = () => {
		console.log('reset')
	}

	return {
		isShow,
		toggle,
		show,
		close,
		formValue,
		setBackground,
		title,
		reset,
		icon: curredIcon
	}
})
