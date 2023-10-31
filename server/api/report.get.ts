import { PageVisits, prisma } from "~/prisma/client";
import dayjs from "dayjs";
import { ReportType } from "~/composables/constants";

const isEmpty = <T>(value: T): boolean => {
  return value === "" || value === 0 || value === undefined || value === null;
};

// 查询当前时间 (精确到天) 和 名字的记录
async function findFirst(name: string): Promise<PageVisits[]> {
  const now = dayjs().format("YYYY-MM-DD");
  return await prisma.$queryRaw`SELECT * FROM page_visite WHERE user_name = ${name} && DATE(created_at) = ${now} LIMIT 1`;
}

export default defineEventHandler(async (e) => {
  const { name, time, type } = getQuery<{ name: string; time: number; type: ReportType }>(e);

  if ([name, time, type].some(isEmpty)) {
    return sendFail("缺少参数");
  }

  //  先查询当前时间访问记录是否已经创建
  const lastTime = await findFirst(name);

  if (lastTime && lastTime.length > 0) {
    const pageVisite = lastTime.pop()!;
    // 已经创建 则 更新
    await prisma.pageVisits.update({
      where: {
        id: pageVisite.id,
        userName: name,
      },
      data: {
        // 更新访问时长
        duration: type === ReportType.duration ? Number(time) + pageVisite.duration : undefined,
        // 更新访问的次数
        number: type === ReportType.number ? pageVisite.number + 1 : undefined,
      },
    });
  } else {
    // 未创建则创建
    await prisma.pageVisits.create({
      data: {
        // 创建访问时长 第一次访问
        duration: Number(time),
        // 访问的 页面名称
        userName: name,
        // 访问的次数 第一次
        number: 1,
      },
    });
  }

  return sendSuccess("ok");
});
