

export default defineEventHandler(async (e) => {

	const body = await readBody(e)

	const token = getRequestHeader(e, 'header')

	if (!body.name) {
		return sendFail('缺少名称')
	}



	console.log(body);

	return 'note'
})
