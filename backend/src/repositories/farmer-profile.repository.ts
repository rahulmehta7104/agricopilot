import prisma from '../lib/prisma';
import { Prisma, FarmerProfile } from '@prisma/client';

export class FarmerProfileRepository {
  async create(data: Prisma.FarmerProfileUncheckedCreateInput): Promise<FarmerProfile> {
    return prisma.farmerProfile.create({ data });
  }

  async findByUserId(userId: string): Promise<FarmerProfile | null> {
    return prisma.farmerProfile.findUnique({ where: { userId } });
  }

  async update(id: string, data: Prisma.FarmerProfileUpdateInput): Promise<FarmerProfile> {
    return prisma.farmerProfile.update({ where: { id }, data });
  }
}
