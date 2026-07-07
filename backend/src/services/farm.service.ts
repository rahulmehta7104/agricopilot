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
