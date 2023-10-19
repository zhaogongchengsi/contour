import { PrismaClient } from '@prisma/client'
import { encrypt } from '../server/utils/hash'
import { randomUUID } from 'uncrypto'

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.create({
		data: {
			account: 'abcdefg@qq.com',
			password: encrypt('abcdefg123..'),
			uid: randomUUID(),
		}
	})

	console.log(`初始化 用户 id:${user.id} 账号:${user.account}`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})