
import emoji from '~/assets/emoji.json'


interface Emoji {
	body: string
}

export const useEmoji = () => {
	const list = computed(() => {
		return Object.entries(emoji as Record<string, Emoji>).map(([name, item]) => {
			return {
				name,
				body: `<svg class="w-8 h-8 mx-auto" width="1rem" height="1rem" viewBox="0 0 64 64">${item.body}</svg>`
			}
		})
	})

	return {
		list
	}
}
