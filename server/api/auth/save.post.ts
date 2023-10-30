import { prisma } from '~/prisma/client'
import { NoteData } from '~/types'

export default defineEventHandler(async (e) => {

	const { name, avatar, cards, color, background, styles, contacts } = await readBody<NoteData>(e)

	if (!name) {
		return sendFail('缺少名称')
	}

	const { uuid, id } = readAuthInfo(e)

	await prisma.user.update({
		where: {
			id: Number(id),
			uid: uuid
		},
		data: {
			name,
			avatar,
			color,
			background,
			styles: styles.join('-'),
			contact: JSON.stringify(contacts)
		}
	})

	await prisma.card.deleteMany({
		where: {
			userId: uuid
		}
	})

	if (cards.length > 0) {
		
		await prisma.card.createMany({
			data: cards.map((card) => {
				const { row, col } = card.size

				const background = typeof card.background === 'string' ? card.background : `linear-gradient(${card.background?.direction}, ${card.background?.colors.join(', ')})`

				return {
					link: card.link,
					buttonStyle: card.buttonStyle,
					image: card.image,
					background: background as string,
					icon: JSON.stringify(card.icon),
					size: `${row}-${col}`,
					sort: card.id,
					userId: uuid
				}
			})
		})

	}

	return sendSuccess(null, '操作成功')
})
