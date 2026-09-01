import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@/generated/prisma/client'

/**
 * Prisma Client 单例。
 *
 * Prisma 7 需要通过 Driver Adapter 连接数据库（SQLite 用 better-sqlite3）。
 * Next.js 开发模式热重载会重复加载模块，这里挂到 globalThis 复用连接。
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? 'file:./dev.db',
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
