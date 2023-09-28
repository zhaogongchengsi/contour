import captcha from 'svg-captcha'
import { randomUUID } from "uncrypto";
import { useRedisStorage } from './storage';

const option = { noise: 3, height: 40, width: 120 }

export async function createCaptcha() {
	const { text, data } = captcha.createMathExpr(option);
	const id = randomUUID()
	const storage = useRedisStorage()
	storage.setItem(id, text)
	return {
		id,
		data
	}
}

export async function verifyCaptcha(id: string, value: string) {
	const storage = useRedisStorage()
	const val = await storage.getItem(id)
	if (val && val === value) {
		storage.removeItem(id)
		return true
	}
	storage.removeItem(id)
	return false
}

export async function deleteCaptchaId(id: string) {
	const storage = useRedisStorage()
	return storage.removeItem(id)
}
