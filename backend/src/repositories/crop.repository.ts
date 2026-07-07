import prisma from '../lib/prisma';
import { Crop } from '@prisma/client';

export class CropRepository {
  async findAll(): Promise<Crop[]> {
    return prisma.crop.findMany({ orderBy: { name: 'asc' } });
  }

  async findById(id: string): Promise<Crop | null> {
    return prisma.crop.findUnique({ where: { id } });
  }

  async create(data: { name: string; scientificName?: string }): Promise<Crop> {
    return prisma.crop.create({ data });
  }

  async update(id: string, data: { name?: string; scientificName?: string }): Promise<Crop> {
    return prisma.crop.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Crop> {
    return prisma.crop.delete({ where: { id } });
  }
}
