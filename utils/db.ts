import { Prisma, PrismaClient } from '@prisma/client'

const createPrismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query'],
  })
}

type PrismaClientSingleton = ReturnType<typeof createPrismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? createPrismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
