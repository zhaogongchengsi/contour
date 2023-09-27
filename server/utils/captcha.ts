import captcha from 'svg-captcha'
import { randomUUID } from "uncrypto";

const option = { noise: 3, height: 40, width: 120 }

export async function createCaptcha() {
	const { text, data } = captcha.createMathExpr(option);
	const id = randomUUID()
	const storage = useStorage('app-redis')
	storage.setItem(id, text)
	return {
		id,
		data
	}
}

export async function verifyCaptcha(id: string, value: string) {
	const storage = useStorage('app-redis')
	const val = await storage.getItem(id)
	if (val && val === value) {
		storage.removeItem(id)
		return true
	}
	storage.removeItem(id)
	return false
}
