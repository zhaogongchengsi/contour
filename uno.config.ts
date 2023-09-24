// uno.config.ts
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'

export default defineConfig({
	shortcuts: [],
	theme: {},
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons(),
		presetTypography(),
		presetWebFonts({})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})