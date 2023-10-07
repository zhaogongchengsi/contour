import { createStorage, type Storage, type StorageValue } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

let captchaStorage: Storage<StorageValue> | null

export function useRedisCaptchaStorage() {
	if (!captchaStorage) {
		captchaStorage = createStorage({
			driver: redisDriver({
				base: 'captcha',
				host: process.env.REDIS_HOST,
				port: Number(process.env.REDIS_PORT),
				password: process.env.REDIS_PASSWORD,
			}),
		});
	}
	return captchaStorage
}




