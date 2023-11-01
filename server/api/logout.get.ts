import { useRedisLoggingStatusStorage } from "../utils/storage";

export default defineEventHandler(async (e) => {
  const name = getQuery(e).name as string;

  if (!name) {
    return sendFail("缺少参数 name");
  }

  const storage = useRedisLoggingStatusStorage();

  await storage?.removeItem(name);

  return sendSuccess();
});
