import { prisma } from "~/prisma/client";

export default defineEventHandler(async (e) => {
  const list = await prisma.user.findMany({
    where: {
      state: 2,
    },
    select: {
      name: true,
      avatar: true,
    },
  });

  return success(list);
});
