import prisma from '../lib/prisma';
import { Prisma, Farm } from '@prisma/client';

export class FarmRepository {
  async create(data: Prisma.FarmUncheckedCreateInput): Promise<Farm> {
    return prisma.farm.create({ data });
  }

  async findById(id: string): Promise<Farm | null> {
    return prisma.farm.findUnique({ 
      where: { id }, 
      include: { crops: { include: { crop: true } } } 
    });
  }

  async findByProfileId(profileId: string): Promise<Farm[]> {
    return prisma.farm.findMany({ 
      where: { profileId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: Prisma.FarmUpdateInput): Promise<Farm> {
    return prisma.farm.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Farm> {
    return prisma.farm.delete({ where: { id } });
  }
}
