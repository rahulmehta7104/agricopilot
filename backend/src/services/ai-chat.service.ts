import { AiChatRepository } from '../repositories/ai-chat.repository';
import { MessageRole } from '@prisma/client';

export class AiChatService {
  private chatRepo = new AiChatRepository();

  async startNewSession(userId: string, title: string) {
    return this.chatRepo.createSession(userId, title);
  }

  async getUserSessions(userId: string) {
    return this.chatRepo.findSessionsByUserId(userId);
  }

  async handleUserMessage(sessionId: string, content: string) {
    if (!content || content.trim() === '') {
      throw new Error('Message content cannot be empty');
    }

    // 1. Save user message to database
    const userMsg = await this.chatRepo.addMessage({
      sessionId,
      role: MessageRole.USER,
      content
    });

    // 2. Fetch full conversation history to maintain context
    const history = await this.chatRepo.getMessagesBySessionId(sessionId);

    // 3. Placeholder: Trigger AI Agent (LangChain/OpenAI) using history
    const mockAiResponse = "This is a placeholder AI response. Full LLM agent integration pending.";

    // 4. Save AI response with token metadata for cost tracking
    const aiMsg = await this.chatRepo.addMessage({
      sessionId,
      role: MessageRole.ASSISTANT,
      content: mockAiResponse,
      llmMetadata: { tokensUsed: 42, latencyMs: 650, model: 'mock-agent' }
    });

    return { userMsg, aiMsg };
  }
}
