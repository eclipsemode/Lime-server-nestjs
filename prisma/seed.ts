import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { tel: '79180000000' },
    update: {},
    create: {
      tel: '79180000000',
      isActivated: true,
      role: 'ADMIN',
      profile: {
        create: {
          name: 'Administrator',
          email: 'admin@admin.com',
        },
      },
    },
  });

  // const pizzaCategory = await prisma.category.upsert({
  //   where: { name: 'Пицца' },
  //   update: {},
  //   create: {
  //     name: 'Пицца',
  //     image: '3c587d49-19d8-47c8-a912-55d4eee33691.jpg',
  //   },
  // });
  //
  // const rollsCategory = await prisma.category.upsert({
  //   where: { name: 'Роллы' },
  //   update: {},
  //   create: {
  //     name: 'Роллы',
  //     image: '807e8ff6-bef2-4a55-b0ce-47922e504951.jpg',
  //   },
  // });

  console.log({
    users: [admin],
    // categories: [pizzaCategory, rollsCategory],
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
