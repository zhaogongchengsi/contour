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
      background: "#101010",
      color: "#ffffff",
      contact: [
        {
          value: "1234567890",
          type: "qq",
        },
        {
          value: "12345678910",
          type: "phone",
        },
        {
          value: "123456789@163.com",
          type: "email",
        },
      ],
    },
  });

  const cards = await prisma.card.createMany({
    data: [
      {
        size: "1-1",
        background: "#333333",
        buttonStyle: "windows",
        image: "",
        link: "#",
        // 客户端发送到后端 后端将其作为排序标记
        order: 0,
        icon: {
          label: "知乎",
          name: "zhihu",
          image: "/icons/zhihu.svg",
          background: "#0c6dfe",
        },
        userId: user.uid,
      },
      {
        size: "1-1",
        background: "#333333",
        buttonStyle: "windows",
        image: "",
        link: "#",
        // 客户端发送到后端 后端将其作为排序标记
        order: 1,
        icon: {
          label: "Figma",
          name: "figma",
          image: "/icons/figma.png",
          background: "",
        },
        userId: user.uid,
      },
    ],
  });

  console.log(`初始化 name: ${user.name} id:${user.id} account:${user.account} cards: ${cards.count}`);
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
