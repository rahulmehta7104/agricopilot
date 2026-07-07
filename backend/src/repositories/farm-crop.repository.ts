import prisma from '../lib/prisma';
import { Prisma, FarmCrop } from '@prisma/client';

export class FarmCropRepository {
  async create(data: Prisma.FarmCropUncheckedCreateInput): Promise<FarmCrop> {
    return prisma.farmCrop.create({ data });
  }

  async findByFarmId(farmId: string): Promise<FarmCrop[]> {
    return prisma.farmCrop.findMany({ 
      where: { farmId },
      include: { crop: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: Prisma.FarmCropUpdateInput): Promise<FarmCrop> {
    return prisma.farmCrop.update({ where: { id }, data });
  }
}
