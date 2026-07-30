import { PrismaClient, Role, Unit, CropStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with Indian farming data...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create a Test User
  const user = await prisma.user.upsert({
    where: { email: 'test@agricopilot.in' },
    update: {},
    create: {
      email: 'test@agricopilot.in',
      name: 'Roshan Singh',
      password: passwordHash,
      role: Role.FARMER,
      preferredLanguage: 'hi', // Hindi preference
      preferredUnits: Unit.ACRES,
      timezone: 'Asia/Kolkata',
    },
  });

  // 2. Create Farmer Profile
  const profile = await prisma.farmerProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      fullName: 'Roshan Singh',
      totalLandHolding: 15.5, // 15.5 acres
    },
  });

  // 3. Create a Farm (in Punjab)
  let farm = await prisma.farm.findFirst({ where: { profileId: profile.id } });
  if (!farm) {
    farm = await prisma.farm.create({
      data: {
        profileId: profile.id,
        name: 'Green Acres, Roshan Singh (Punjab)',
        size: 15.5,
        unit: Unit.ACRES,
      },
    });
  }

  // 4. Ensure some base Crops exist
  const wheat = await prisma.crop.upsert({
    where: { name: 'Wheat' },
    update: {},
    create: { name: 'Wheat', scientificName: 'Triticum' },
  });

  const rice = await prisma.crop.upsert({
    where: { name: 'Rice' },
    update: {},
    create: { name: 'Rice', scientificName: 'Oryza sativa' },
  });

  // 5. Add Crops to the Farm
  await prisma.farmCrop.createMany({
    data: [
      {
        farmId: farm.id,
        cropId: wheat.id,
        status: CropStatus.GROWING,
        season: 'Rabi',
        yieldEstimate: 4500, // kg
      },
      {
        farmId: farm.id,
        cropId: rice.id,
        status: CropStatus.PLANNED,
        season: 'Kharif',
        yieldEstimate: 6000,
      }
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seeding completed!');
  console.log('--------------------------------------------------');
  console.log('Login credentials for testing:');
  console.log('Email: test@agricopilot.in');
  console.log('Password: password123');
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error(e);
    // @ts-ignore
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
