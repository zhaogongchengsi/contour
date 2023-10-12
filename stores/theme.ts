import { darkTheme, lightTheme } from 'naive-ui'

export const useColorModeStore = defineStore('colorMode', () => {
	const isDark = useDark({
		valueDark: 'dark',
		valueLight: 'light',
	})

	const toggleDark = useToggle(isDark)

	const uiTheme = computed(() => {
		return isDark ? darkTheme : lightTheme
	})

	return {
		isDark,
		toggleDark,
		uiTheme
	}
})