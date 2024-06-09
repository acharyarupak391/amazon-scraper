import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main() {
  try {
    await prisma.$executeRaw`DELETE FROM "Product";`
  } catch (error) {
    console.error(error)
  }
}

main()