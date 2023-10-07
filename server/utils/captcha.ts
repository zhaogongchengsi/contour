import captcha from 'svg-captcha'
import { randomUUID } from "uncrypto";
import { useRedisCaptchaStorage } from './storage';
import dayjs from 'dayjs';

const option = { noise: 3, height: 34, width: 120 }

interface CaptchaValue {
	issue: string,
	expert: string,
	value: string
}

export async function createCaptcha() {
	const storage = useRedisCaptchaStorage()
	const runtime = useRuntimeConfig()

	const id = randomUUID()
	const issue = dayjs.unix(Date.now())
	const expert = issue.add(runtime.captchaExpert || 3, 'minute')
	const { text, data } = captcha.createMathExpr(option);

	storage.setItem(id, {
		issue: issue.format(),
		expert: expert.format(),
		value: text
	})

	return {
		id,
		data
	}
}

export async function verifyCaptcha(id: string, value: string) {
	const storage = useRedisCaptchaStorage()
	const val = await storage.getItem(id) as CaptchaValue
	if (val) {
		storage.removeItem(id)
		if (dayjs().isBefore(val.expert)) {
			return false
		}
		return val.value === value
	}
	storage.removeItem(id)
	return false
}

export async function deleteCaptchaId(id: string) {
	const storage = useRedisCaptchaStorage()
	return storage.removeItem(id)
}
