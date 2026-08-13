// import { PrismaClient } from '@prisma/client'

// let prisma: PrismaClient

// declare global {
//   var __prisma: PrismaClient | undefined
// }

// if (!global.__prisma) {
//   const config = useRuntimeConfig()
//   global.__prisma = new PrismaClient({
//     datasources: {
//       db: {
//         url: config.databaseUrl
//       }
//     }
//   })
// }

// prisma = global.__prisma

// export default prisma

import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const config = useRuntimeConfig()

const adapter = new PrismaLibSQL({
  url: config.tursoDatabaseUrl,
  authToken: config.tursoAuthToken,
})

const prisma = new PrismaClient({ adapter })

export { prisma }
export default prisma

