import { PrismaClient } from "@prisma/client";
import { encrypt } from "../server/utils/hash";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      permission: 0,
      name: "zhaozunhong",
      account: "abcdefg@qq.com",
      password: encrypt("abcdefg123.."),
    },
  });

  console.log(`初始化 name: ${user.name} id:${user.id} account:${user.account}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
