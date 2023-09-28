import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

const storage = createStorage({
	driver: redisDriver({
		base: process.env.APP_BASE,
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT),
		password: process.env.REDIS_PASSWORD,
	}),
});

export function useRedisStorage() {
	return storage
}


