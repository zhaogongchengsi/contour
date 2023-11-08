import { isUserInfo } from "~/composables/schema";
import { prisma } from "~/prisma/client";
import { useRedisLoggingStatusStorage } from "../utils/storage";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { success: ok, message } = await isUserInfo({
    ...body,
    code: Number(body.code),
  });

  if (!ok) {
    return fail(message);
  }

  const user = await prisma.user.findFirst({
    where: {
      account: body.account,
      name: body.name,
    },
    select: {
      password: true,
      id: true,
      uid: true,
      account: true,
      name: true,
      avatar: true,
    },
  });

  if (!user) {
    return fail("用户不存在");
  }

  if (!decrypt(body.password, user.password as any)) {
    return fail("密码错误");
  }

  const { token, exp } = issueToken({
    uuid: user.uid!,
    id: user.id,
  });

  const storage = useRedisLoggingStatusStorage();

  await storage?.setItem(user.name!, exp);

  // @ts-ignore
  delete user.password;

  return success<AppUserResponse>({
    authorization: {
      token,
      exp,
    },
    user: user as unknown as User,
  });
});
