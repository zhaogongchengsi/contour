import { createStorage, type Storage, type StorageValue } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

let captchaStorage: Storage<StorageValue> | null;
export function useRedisCaptchaStorage() {
  try {
    if (!captchaStorage) {
      captchaStorage = createStorage({
        driver: redisDriver({
          base: "captcha",
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
        }),
      });
    }
    return captchaStorage!;
  } catch (err: any) {
    throw createError(err);
  }
}

let loggingStateStorage: Storage<StorageValue> | null;
export function useRedisLoggingStatusStorage() {
  try {
    if (!loggingStateStorage) {
      loggingStateStorage = createStorage({
        driver: redisDriver({
          base: "logging-status",
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
        }),
      });
    }
    return loggingStateStorage!;
  } catch (err: any) {
    throw createError(err);
  }
}
