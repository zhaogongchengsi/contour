import { UserInfoScheme, isUserInfo } from "~/composables/schema";
import { prisma } from "~/prisma/client";

export default defineEventHandler(async (event) => {
  const body = await readBody<UserInfoScheme>(event);

  const { success: ok, message } = await isUserInfo(body);
  if (!ok) {
    return fail(message);
  }

  // todo: 验证邮箱真实性

  try {
    const oldUser = await prisma.user.findFirst({
      where: {
        account: body.account,
        name: body.name,
      },
    });

    if (oldUser) {
      return fail("用户已存在");
    }

    const user = await prisma.user.create({
      data: {
        account: body.account,
        name: body.name,
        password: encrypt(body.password),
      },
    });

    // @ts-ignore
    delete user.password;

    return success(user, "注册成功");
  } catch (err: any) {
    return fail("注册失败");
  }
});
