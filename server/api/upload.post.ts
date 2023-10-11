import { useUpload } from "../utils/upload";

export default defineEventHandler(async (event) => {

	const files = await readMultipartFormData(event) || []

	const { sava } = useUpload()
	const urls = []

	for (const { name, filename, data } of files) {
		const { url, name: n } = await sava(filename!, name!, data)
		urls.push({
			url,
			name: n
		})
	}

	return sendSuccess(urls)

})
