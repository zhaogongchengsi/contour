import { prisma } from '~/prisma/client'
import { NoteData } from '~/types'

export default defineEventHandler(async (e) => {

	const body = await readBody(e) as NoteData

	if (!body.name) {
		return sendFail('缺少名称')
	}

	const { uuid, id } = readAuthInfo(e)


	await prisma.user.update({
		where: {
			id: Number(id),
			uid: uuid
		},
		data: {
			name: body.name,
			avatar: body.avatar,
		}
	})

	console.log(uuid, id);


	return 'note'
})
