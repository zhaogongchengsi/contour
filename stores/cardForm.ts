import { defineStore } from 'pinia'
import { useToggle } from '@vueuse/core'
import { CardFormValue, IconInfo } from '~/types'

const initCardValue: CardFormValue = {
	size: '1-1',
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
	
	const formValue = reactive<CardFormValue>(initCardValue)

	const setBackground = (value: string) => {
		formValue.background = value
	}

	const reset = () => {
		
		const { size, link, buttonStyle, image, background } = initCardValue
		formValue.size = size
		formValue.link = link
		formValue.buttonStyle = buttonStyle
		formValue.image = image
		formValue.background = background
		
		console.log(formValue);
		
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
