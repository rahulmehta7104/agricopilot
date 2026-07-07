import { PrismaClient, Role, Unit, CropStatus, RecommendationType, RecommendationStatus, MessageRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing data to prevent unique constraint errors on re-runs
  // (Using deleteMany in reverse order of dependencies)
  await prisma.aiChatMessage.deleteMany();
  await prisma.aiChatSession.deleteMany();
  await prisma.recommendationFeedback.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.farmCrop.deleteMany();
  await prisma.crop.deleteMany();
  await prisma.farm.deleteMany();
  await prisma.farmerProfile.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Master Data (Crops)
  const wheat = await prisma.crop.create({
    data: { name: 'Wheat', scientificName: 'Triticum aestivum' },
  });
  
  const soybean = await prisma.crop.create({
    data: { name: 'Soybean', scientificName: 'Glycine max' },
  });

  // 3. Seed User & Profile
  const user = await prisma.user.create({
    data: {
      email: 'john.farmer@example.com',
      phone: '+15550198234',
      role: Role.FARMER,
      preferredLanguage: 'en',
      preferredUnits: Unit.HECTARES,
      timezone: 'America/Chicago',
      notificationPreferences: { sms: true, email: true, dailyDigest: true },
      farmerProfile: {
        create: {
          fullName: 'Johnathan Miller',
          totalLandHolding: 15.5,
        }
      }
    },
    include: { farmerProfile: true }
  });

  if (!user.farmerProfile) throw new Error('Profile creation failed');

  // 4. Seed Farm
  const farm = await prisma.farm.create({
    data: {
      profileId: user.farmerProfile.id,
      name: 'North Block - Riverside',
      size: 15.5,
      unit: Unit.HECTARES,
    }
  });

  // 5. Seed FarmCrops (Lifecycle tracking)
  await prisma.farmCrop.create({
    data: {
      farmId: farm.id,
      cropId: wheat.id,
      status: CropStatus.HARVESTED,
      season: 'Rabi',
      cropCycle: 'Winter 2025',
      expectedHarvestDate: new Date('2026-04-15T00:00:00Z'),
      actualHarvestDate: new Date('2026-04-12T00:00:00Z'),
      yieldEstimate: 45.2, // metric tons
    }
  });

  await prisma.farmCrop.create({
    data: {
      farmId: farm.id,
      cropId: soybean.id,
      status: CropStatus.GROWING,
      season: 'Kharif',
      cropCycle: 'Summer 2026',
      expectedHarvestDate: new Date('2026-10-10T00:00:00Z'),
    }
  });

  // 6. Seed AI Recommendation
  const rec = await prisma.recommendation.create({
    data: {
      farmId: farm.id,
      cropId: soybean.id,
      type: RecommendationType.FERTILIZER,
      title: 'Optimal NPK Application for Soybean Bloom',
      description: 'Apply 20kg of Phosphorus (P2O5) and 30kg of Potassium (K2O) per hectare within the next 5 days to maximize pod development.',
      reasoning: 'Recent soil moisture levels are high, and the crop is entering the crucial V5 (bloom) stage. Potassium demand peaks during this phase.',
      confidence: 0.92,
      modelVersion: 'agri-expert-v2.1',
      promptVersion: 'fert-v4',
      status: RecommendationStatus.ACCEPTED,
      metadata: { targetNutrients: ['P', 'K'], urgency: 'HIGH' }
    }
  });

  // 7. Seed Recommendation Feedback
  await prisma.recommendationFeedback.create({
    data: {
      recommendationId: rec.id,
      rating: 5,
      feedback: 'Applied the exact amounts, foliage looks much greener.',
      implemented: true,
      implementedAt: new Date('2026-07-01T10:00:00Z'),
    }
  });

  // 8. Seed AI Chat Session & Messages
  const chatSession = await prisma.aiChatSession.create({
    data: {
      userId: user.id,
      title: 'Soybean Pest Identification'
    }
  });

  await prisma.aiChatMessage.create({
    data: {
      sessionId: chatSession.id,
      role: MessageRole.USER,
      content: 'I noticed small brown spots on the lower leaves of my soybeans. What could it be?',
    }
  });

  await prisma.aiChatMessage.create({
    data: {
      sessionId: chatSession.id,
      role: MessageRole.ASSISTANT,
      content: 'Based on your region and the current humid weather, small brown spots on lower soybean leaves often indicate Septoria Brown Spot. It is a common fungal disease. Can you check if the spots have a yellow halo around them?',
      llmMetadata: { model: 'agri-llm-v1', tokensUsed: 145, latencyMs: 850 }
    }
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
