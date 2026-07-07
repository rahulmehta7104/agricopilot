import prisma from '../lib/prisma';
import { Prisma, AiChatSession, AiChatMessage } from '@prisma/client';

export class AiChatRepository {
  async createSession(userId: string, title: string): Promise<AiChatSession> {
    return prisma.aiChatSession.create({ data: { userId, title } });
  }

  async findSessionsByUserId(userId: string): Promise<AiChatSession[]> {
    return prisma.aiChatSession.findMany({ 
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async addMessage(data: Prisma.AiChatMessageUncheckedCreateInput): Promise<AiChatMessage> {
    return prisma.aiChatMessage.create({ data });
  }

  async getMessagesBySessionId(sessionId: string): Promise<AiChatMessage[]> {
    return prisma.aiChatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' }
    });
  }
}
