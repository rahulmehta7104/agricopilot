import prisma from '../lib/prisma';
import { Crop } from '@prisma/client';

export class CropRepository {
  async findAll(): Promise<Crop[]> {
    return prisma.crop.findMany({ orderBy: { name: 'asc' } });
  }

  async findById(id: string): Promise<Crop | null> {
    return prisma.crop.findUnique({ where: { id } });
  }
}
