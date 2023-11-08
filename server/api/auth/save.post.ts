import { prisma } from "~/prisma/client";
import { NoteData } from "~/types";

export default defineEventHandler(async (e) => {
  const { name, avatar, cards, color, background, styles, contacts } = await readBody<NoteData>(e);

  if (!name) {
    return fail("缺少名称");
  }

  const { uuid, id } = readAuthInfo(e);

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
      styles: styles,
      contact: JSON.stringify(contacts),
    },
  });

  if (cards.length < 1) {
    return success(null, "操作成功");
  }

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
      sort: card.id,

      userId: uuid,
    };
  });

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.card.deleteMany({
        where: {
          userId: uuid,
        },
      });

      await prisma.card.createMany({
        data: newCards,
      });
    });
    return success(null, "操作成功");
  } catch (err) {
    return fail("操作失败");
  }
});
