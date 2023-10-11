import { outputFile } from 'fs-extra'
import { join, parse, normalize } from 'pathe'
import { sha256 } from "ohash";

export function useUpload() {
	const { path, urlPrefix } = useRuntimeConfig().upload as { path: string, urlPrefix: string }

	const sava = async (fileName: string, key: string, data: Buffer) => {

		const { ext, name } = parse(fileName)
		const hash = sha256(name)
		const _path = join(key, hash + ext)
		const url = [urlPrefix, normalize(_path)].join('/')

		await outputFile(join(path, _path), data)

		return {
			name: hash + ext,
			hash,
			path,
			url
		}
	}

	return {
		sava
	}
}

