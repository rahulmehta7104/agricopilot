import { PrismaClient, Role, Unit, CropStatus, RecommendationType, RecommendationStatus, MessageRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding...');

  // 1. Clean existing data (Except Users to preserve Google Logins)
  await prisma.aiChatMessage.deleteMany();
  await prisma.aiChatSession.deleteMany();
  await prisma.recommendationFeedback.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.farmCrop.deleteMany();
  await prisma.crop.deleteMany();
  await prisma.farm.deleteMany();
  await prisma.farmerProfile.deleteMany();
  // Do NOT delete users so the logged-in user isn't forced out.

  // 2. Seed Master Data (Crops)
  const wheat = await prisma.crop.create({ data: { name: 'Wheat', scientificName: 'Triticum aestivum' } });
  const soybean = await prisma.crop.create({ data: { name: 'Soybean', scientificName: 'Glycine max' } });
  const corn = await prisma.crop.create({ data: { name: 'Corn', scientificName: 'Zea mays' } });
  const cotton = await prisma.crop.create({ data: { name: 'Cotton', scientificName: 'Gossypium' } });
  const rice = await prisma.crop.create({ data: { name: 'Rice', scientificName: 'Oryza sativa' } });
  const sugarcane = await prisma.crop.create({ data: { name: 'Sugarcane', scientificName: 'Saccharum officinarum' } });

  const allCrops = [wheat, soybean, corn, cotton, rice, sugarcane];

  // 3. Find existing user (the one logged in via Google) or create a fallback
  let mainUser = await prisma.user.findFirst();
  if (!mainUser) {
    mainUser = await prisma.user.create({
      data: {
        email: 'john.farmer@example.com',
        role: Role.FARMER,
        name: 'John Farmer'
      }
    });
  }

  // 4. Generate 10+ Diverse Indian Farmers
  const farmers = [
    {
      user: mainUser, // Bind the first farm to the logged-in user!
      fullName: mainUser.name || 'Roshan Singh',
      farmName: 'Green Acres',
      location: 'Punjab, India',
      lat: 31.1471,
      lon: 75.3412,
      land: 15.5
    },
    {
      user: await prisma.user.create({ data: { email: 'vikram.singh@example.com', name: 'Vikram Singh' } }),
      fullName: 'Vikram Singh',
      farmName: 'Singh Farms',
      location: 'Haryana, India',
      lat: 29.6857,
      lon: 76.9905,
      land: 20.0
    },
    {
      user: await prisma.user.create({ data: { email: 'anjali.desai@example.com', name: 'Anjali Desai' } }),
      fullName: 'Anjali Desai',
      farmName: 'Desai Agro',
      location: 'Maharashtra, India',
      lat: 18.5204,
      lon: 73.8567,
      land: 12.5
    },
    {
      user: await prisma.user.create({ data: { email: 'rajesh.kumar@example.com', name: 'Rajesh Kumar' } }),
      fullName: 'Rajesh Kumar',
      farmName: 'Kumar Fields',
      location: 'Uttar Pradesh, India',
      lat: 26.4499,
      lon: 80.3318,
      land: 8.0
    },
    {
      user: await prisma.user.create({ data: { email: 'karthik.n@example.com', name: 'Karthik N.' } }),
      fullName: 'Karthik N.',
      farmName: 'Kaveri Delta Farms',
      location: 'Tamil Nadu, India',
      lat: 11.0168,
      lon: 76.9558,
      land: 5.5
    },
    {
      user: await prisma.user.create({ data: { email: 'amit.patel@example.com', name: 'Amit Patel' } }),
      fullName: 'Amit Patel',
      farmName: 'Patel Holdings',
      location: 'Gujarat, India',
      lat: 23.0225,
      lon: 72.5713,
      land: 25.0
    },
    {
      user: await prisma.user.create({ data: { email: 'suresh.yadav@example.com', name: 'Suresh Yadav' } }),
      fullName: 'Suresh Yadav',
      farmName: 'Yadav Krishi',
      location: 'Madhya Pradesh, India',
      lat: 22.7196,
      lon: 75.8577,
      land: 18.2
    },
    {
      user: await prisma.user.create({ data: { email: 'meera.b@example.com', name: 'Meera B.' } }),
      fullName: 'Meera B.',
      farmName: 'Desert Bloom',
      location: 'Rajasthan, India',
      lat: 26.9124,
      lon: 75.7873,
      land: 30.0
    },
    {
      user: await prisma.user.create({ data: { email: 'sourav.das@example.com', name: 'Sourav Das' } }),
      fullName: 'Sourav Das',
      farmName: 'Bengal Harvest',
      location: 'West Bengal, India',
      lat: 23.2324,
      lon: 87.8615,
      land: 4.5
    },
    {
      user: await prisma.user.create({ data: { email: 'manish.tiwari@example.com', name: 'Manish Tiwari' } }),
      fullName: 'Manish Tiwari',
      farmName: 'Ganga Plains',
      location: 'Bihar, India',
      lat: 25.5941,
      lon: 85.1376,
      land: 7.8
    }
  ];

  for (const f of farmers) {
    const profile = await prisma.farmerProfile.create({
      data: {
        userId: f.user.id,
        fullName: f.fullName,
        totalLandHolding: f.land,
      }
    });

    const farm = await prisma.farm.create({
      data: {
        profileId: profile.id,
        name: f.farmName,
        size: f.land,
        latitude: f.lat,
        longitude: f.lon,
        location: f.location
      }
    });

    // Pick 3 random crops for each farm
    const shuffledCrops = allCrops.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    for (const crop of shuffledCrops) {
      await prisma.farmCrop.create({
        data: {
          farmId: farm.id,
          cropId: crop.id,
          status: CropStatus.GROWING,
          season: Math.random() > 0.5 ? 'Kharif' : 'Rabi',
          yieldEstimate: Math.floor(Math.random() * 5000) + 1000,
          healthScore: Math.floor(Math.random() * 30) + 70, // 70 to 100
        }
      });
    }

    // Seed some active recommendations (alerts) for the farm
    const numAlerts = Math.floor(Math.random() * 3) + 1; // 1 to 3 alerts
    for (let i = 0; i < numAlerts; i++) {
      await prisma.recommendation.create({
        data: {
          farmId: farm.id,
          type: RecommendationType.FERTILIZER,
          title: `Action Required: Fertilizer ${i + 1}`,
          description: `Apply NPK fertilizer due to recent heavy rains in ${f.location}.`,
          status: RecommendationStatus.PENDING,
          confidence: 0.85
        }
      });
    }
  }

  console.log('✅ Comprehensive seeding completed successfully! Populated 10 Indian farmers.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
