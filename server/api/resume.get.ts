import { prisma } from "~/prisma/client";

export default defineEventHandler(async (e) => {
  const name = getQuery(e).name as string;
  if (!name) {
    return fail("缺少 name");
  }

  const user = await prisma.user.findFirst({
    where: {
      name,
    },
    select: {
      name: true,
      avatar: true,
      background: true,
      styles: true,
      color: true,
      description: true,
      contact: true,
      state: true,
      cards: true,
    },
  });

  if (!user) {
    return fail("用户不存在");
  }

  return success(user);
});
