import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
  var __prisma: PrismaClient | undefined
}

if (!global.__prisma) {
  const config = useRuntimeConfig()
  global.__prisma = new PrismaClient({
    datasources: {
      db: {
        url: config.databaseUrl
      }
    }
  })
}

prisma = global.__prisma

export default prisma
