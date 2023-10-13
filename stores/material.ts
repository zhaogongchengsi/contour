import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { LinearGradient } from '~/types'

const STORE_NAME = 'contourMaterialStore'
const defineKey = (key: string) => `contour-material-${key}`

export const useMaterial = defineStore(STORE_NAME, () => {

	const colors = useStorage<string[]>(defineKey('colors'), [
		'#FFFFFF',
		'#000000',
		'#18A058',
		'#2080F0',
		'#F0A020',
	])

	const generateColor = useStorage<LinearGradient[]>(defineKey('generate-color'), [
		{
			id: 0,
			direction: 'to right',
			colors: ['#42275a', '#734b6d']
		},
		{
			id: 1,
			direction: 'to right',
			colors: ['#141e30', '#243b55']
		},
		{
			id: 2,
			direction: 'to right',
			colors: ['#000428', '#004e92']
		},
		{
			id: 3,
			direction: 'to right',
			colors: ['#f00000', '#dc281e']
		},
		{
			id: 4,
			direction: 'to right',
			colors: ['#2c3e50', '#fd746c']
		},
		{
			id: 5,
			direction: 'to right',
			colors: ['#56ab2f', '#a8e063']
		}, 
		{
			id: 6,
			direction: 'to right',
			colors: ['#cb2d3e', '#ef473a']
		},
		{
			id: 7,
			direction: 'to left bottom',
			colors: ['#051937', '#004d7a', '#008793', '#00bf72', '#a8eb12']
		}, 
		{
			id: 8,
			direction: 'to left bottom',
			colors: ['#2e6bc6', '#0099e9', '#0099e9', '#00db84', '#a8eb12']
		},
		{
			id: 9,
			direction: 'to right',
			colors: ['#d16ba5', '#c777b9', '#ba83ca', '#aa8fd8', '#9a9ae1', '#8aa7ec', '#79b3f4', '#69bff8', '#52cffe', '#41dfff', '#46eefa', '#5ffbf1']
		}
	])

	const images = useStorage<string[]>(defineKey('images'), [
		'/java.png',
		'/vue.png',
		'/wakkhaven-bg1.png',
		'/wakllhave-bg2.png',
		'/wallhaven-6deqk7_1920x1080.png',
		'/web.png',
	])

	const generateColorStyle = (config: LinearGradient) => {
		return `linear-gradient(${config.direction}, ${config.colors.join(', ')})`
	}


	return {
		colors,
		generateColor,
		images,
		generateColorStyle
	}
})