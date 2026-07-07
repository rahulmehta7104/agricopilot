import prisma from '../lib/prisma';
import { Prisma, Recommendation, RecommendationStatus } from '@prisma/client';

export class RecommendationRepository {
  async create(data: Prisma.RecommendationUncheckedCreateInput): Promise<Recommendation> {
    return prisma.recommendation.create({ data });
  }

  async findByFarmId(farmId: string): Promise<Recommendation[]> {
    return prisma.recommendation.findMany({ 
      where: { farmId },
      include: { feedbacks: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateStatus(id: string, status: RecommendationStatus): Promise<Recommendation> {
    return prisma.recommendation.update({ 
      where: { id }, 
      data: { status } 
    });
  }
}
