import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const password = '123456';
  const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

  const user = await prisma.user.upsert({
    where: { email: 'johndoe@outlook.com' },
    update: {},
    create: {
      email: 'johndoe@outlook.com',
      password: passwordHash,
    },
  });
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
