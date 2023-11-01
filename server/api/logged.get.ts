import { useRedisLoggingStatusStorage } from "../utils/storage";

export default defineEventHandler(async (e) => {
  const name = getQuery(e).name as string;

  if (!name) {
    return sendFail("缺少参数 name");
  }

  const storage = useRedisLoggingStatusStorage();
  
  const value = await storage?.getItem(name);

  if (!value) {
    return sendFail("未登录");
  }

  const now = Date.now();

  if (now > Number(value)) {
    return sendFail("未登录");
  }

  return sendSuccess("登录中...");
});
