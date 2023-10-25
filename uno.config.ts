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
		['~', 'justify-center flex items-center'],
		['link', 'text-4 sm:text-5 font-mono md:text-6 hover:underline  underline-offset-5 hover:text-purple-500 decoration-purple-500'],
		['primary-input', 'bg-transparent outline-none flex-1'],
		['from-item', 'flex gap-5 h-10 md:h-14 text-4 md:text-5 border-b px-2 focus-within:border-color-purple-500'],
		['primary-icon', 'w-4 h-4 md:w-6 md:h-6'],
		['primary-border-color', 'border-color-zinc-200 dark:border-color-gray-500/50'],

		['primary-text', 'text-3 sm:text-4 md:text-5 lg:text-6'],

		['primary-button-color', 'bg-white/90 hover:bg-white'],
		['primary-button', 'px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded-md'],
		['primary-button-text', 'text-black primary-text'],

		['primary-button-flip', 'bg-zinc-900 px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded-md'],
		['primary-button-text-flip', 'text-white primary-text'],
	],
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons(),
		presetTypography(),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})