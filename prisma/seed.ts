// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

console.log('DB:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
        email: "tim.james@lrqa.com",
        name: "tim james",
        password: "1peefreely!",
    }
  });

  // Add more seed data here...
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
