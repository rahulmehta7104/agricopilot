import { RecommendationRepository } from '../repositories/recommendation.repository';
import { Prisma, RecommendationStatus } from '@prisma/client';

export class RecommendationService {
  private recRepo = new RecommendationRepository();

  async getFarmRecommendations(farmId: string) {
    return this.recRepo.findByFarmId(farmId);
  }

  async processRecommendationAction(id: string, action: 'ACCEPT' | 'REJECT') {
    const status = action === 'ACCEPT' ? RecommendationStatus.ACCEPTED : RecommendationStatus.REJECTED;
    return this.recRepo.updateStatus(id, status);
  }

  async generateRecommendationForFarm(farmId: string, type: string) {
    // Placeholder business logic for future AI integration
    // Here we will inject LangChain/OpenAI calls, fetch Farm context, Soil, and Weather.
    throw new Error('AI Integration not yet active for dynamic generation.');
  }
}
