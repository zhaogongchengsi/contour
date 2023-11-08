export default defineEventHandler(async (e) => {
  const name = getQuery(e).name as string;

  if (!name) {
    return fail("缺少参数 name");
  }

  const storage = useRedisLoggingStatusStorage();

  const value = await storage?.getItem(name);

  if (!value) {
    return fail("未登录");
  }

  const now = Date.now();
 
  if (now > Number(value)) {
    return fail("未登录");
  }

  return success("登录中...");
});
