import { prisma } from "~/prisma/client";

const formateBackground = <T extends { direction?: string; colors?: string[] }>(value: T) => {
  return typeof value === "string" ? value : `linear-gradient(${value?.direction}, ${value?.colors?.join(", ")})`;
};

export default defineEventHandler(async (e) => {
  const { name, avatar, cards, color, background, config, contact } = await readBody<RequestResume>(e);

  if (!name) {
    return fail("缺少名称");
  }

  const { uuid, id } = readAuthInfo(e);
  const logger = useLogger();

  const newCards = cards.map((card) => {
    // @ts-ignore
    delete card.id;

    return {
      ...card,
      // TODO: 卡片背景颜色还未统一 需要统一为字符串
      // @ts-ignore
      background: formateBackground(card.background),
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
          // @ts-ignore
          background: formateBackground(background),
          config,
          contact: contact as any,
        },
      });

      await prisma.card.deleteMany({
        where: {
          userId: uuid,
        },
      });

      if (cards.length > 1) {
        await prisma.card.createMany({
          // @ts-ignore
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
