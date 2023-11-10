import { prisma } from "~/prisma/client";

export default defineEventHandler(async (e) => {
  const { name, avatar, cards, color, background, config, contact } = await readBody<RequestResume>(e);

  if (!name) {
    return fail("缺少名称");
  }

  const { uuid, id } = readAuthInfo(e);
  const logger = useLogger();

  const newCards = cards.map((card) => {
    const background =
      typeof card.background === "string"
        ? card.background
        : `linear-gradient(${card.background?.direction}, ${card.background?.colors.join(", ")})`;

    return {
      link: card.link,
      buttonStyle: card.buttonStyle,
      image: card.image,
      background: background,
      icon: JSON.stringify(card.icon),
      size: card.size,
      // 将id 作为 排序标记
      order: card.order!,
      userId: uuid,
    };
  });

  logger.info(`${uuid} update !`);

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: {
          id: Number(id),
          uid: uuid,
        },
        data: {
          name,
          avatar,
          color,
          background,
          config,
          contact: JSON.stringify(contact),
        },
      });

      await prisma.card.deleteMany({
        where: {
          userId: uuid,
        },
      });

      if (cards.length > 1) {
        await prisma.card.createMany({
          data: newCards,
        });
      }
    });

    return success(null, "操作成功");
  } catch (err) {
    logger.error(`更改失败: ${err}`);
    return fail("操作失败");
  }
});
