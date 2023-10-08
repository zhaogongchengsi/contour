import { useBgCos } from "~/server/utils/cos"

export default defineEventHandler(async () => {
	return sendSuccess(await useBgCos())
})



