import { PrismaClient } from "@prisma/client";
import { achievementCatalog } from "../data/saas-data";

const prisma = new PrismaClient();

async function main() {
  for (const achievement of achievementCatalog) {
    await prisma.achievement.upsert({
      where: { key: achievement.key },
      update: achievement,
      create: achievement,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
