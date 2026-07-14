import { FarmRepository } from '../repositories/farm.repository';
import { FarmCropRepository } from '../repositories/farm-crop.repository';
import { Prisma } from '@prisma/client';

export class FarmService {
  private farmRepo = new FarmRepository();
  private cropRepo = new FarmCropRepository();

  async registerFarm(data: Prisma.FarmUncheckedCreateInput) {
    if (Number(data.size) <= 0) {
      throw new Error('Farm size must be greater than zero');
    }
    return this.farmRepo.create(data);
  }

  async setupFarmProfile(userId: string, fullName: string, farmName: string, size: number) {
    if (size <= 0) {
      throw new Error('Farm size must be greater than zero');
    }
    
    // We should use prisma directly for the transaction to ensure atomicity
    const { prisma } = require('../lib/prisma');
    
    // Check if user already has a profile
    const existingProfile = await prisma.farmerProfile.findUnique({
      where: { userId }
    });

    if (existingProfile) {
      throw new Error('You have already set up a farm profile for this account.');
    }
    
    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Create FarmerProfile
      const profile = await tx.farmerProfile.create({
        data: {
          userId,
          fullName,
          totalLandHolding: size
        }
      });

      // 2. Create Farm
      const farm = await tx.farm.create({
        data: {
          profileId: profile.id,
          name: farmName,
          size: size,
        }
      });

      return { profile, farm };
    });
  }

  async getFarmerFarms(profileId: string) {
    return this.farmRepo.findByProfileId(profileId);
  }

  async getFarmDetails(farmId: string) {
    const farm = await this.farmRepo.findById(farmId);
    if (!farm) throw new Error('Farm not found');
    return farm;
  }

  async addCropToFarm(data: Prisma.FarmCropUncheckedCreateInput) {
    if (data.expectedHarvestDate && new Date(data.expectedHarvestDate) < new Date()) {
      throw new Error('Expected harvest date cannot be in the past');
    }
    return this.cropRepo.create(data);
  }
}
