const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Generating hash for "password123"...');
  const hash = await bcrypt.hash('password123', 10);
  
  console.log('Updating all users with new password...');
  const result = await prisma.user.updateMany({
    data: { password: hash }
  });
  
  console.log(`Successfully updated ${result.count} users!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
