// uno.config.ts
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss'

export default defineConfig({
	shortcuts: [
		['sm-icon', 'w-4 h-4'],
		['md-icon', 'w-8 h-8'],
		['lg-icon', 'w-8 h-8'],
		['xl-icon', 'w-10 h-10'],
		['link', 'text-4 sm:text-5 font-mono md:text-6 hover:underline  underline-offset-5 hover:text-purple-500 decoration-purple-500'],
		['primary-button', 'w-full h-10 md:h-12 bg-purple-500 hover:bg-purple-400 text-white rounded-md'],
		['primary-input', 'bg-transparent outline-none flex-1'],
		['from-item', 'flex gap-5 h-10 md:h-14 text-4 md:text-5 border-b px-2 focus-within:border-color-purple-500'],
		['primary-text', 'text-4 md:text-5 lg:text-6'],
		['primary-icon', 'w-4 h-4 md:w-6 md:h-6'],
		['primary-border-color', 'border-color-zinc-200 dark:border-color-gray-500/50'],
	],
	theme: {

	},
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons(),
		presetTypography(),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})