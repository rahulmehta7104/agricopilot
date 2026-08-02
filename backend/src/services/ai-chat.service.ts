import { AiChatRepository } from '../repositories/ai-chat.repository';
import { MessageRole } from '@prisma/client';
import { GoogleGenAI } from '@google/genai';

export class AiChatService {
  private chatRepo = new AiChatRepository();

  async startNewSession(userId: string, title: string) {
    return this.chatRepo.createSession(userId, title);
  }

  async getUserSessions(userId: string) {
    return this.chatRepo.findSessionsByUserId(userId);
  }

  async handleUserMessageStream(sessionId: string, content: string) {
    if (!content || content.trim() === '') {
      throw new Error('Message content cannot be empty');
    }

    // 1. Save user message to database
    await this.chatRepo.addMessage({
      sessionId,
      role: MessageRole.USER,
      content
    });

    // 2. Fetch full conversation history to maintain context
    const history = await this.chatRepo.getMessagesBySessionId(sessionId);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your-gemini-api-key') {
       throw new Error("Gemini API key is not configured");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const contents = history.map(msg => ({
      role: msg.role === MessageRole.USER ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = "You are AgriCopilot, an expert agricultural AI assistant. Help the farmer with crop management, weather analysis, and general farming advice. Keep responses concise and practical.";

    try {
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-1.5-flash',
        contents,
        config: {
          systemInstruction: systemInstruction,
        }
      });
      return responseStream;
    } catch (error: any) {
      console.error('AI Chat Stream error, falling back to mock response:', error.message);
      // Return a fake async iterable that simulates a stream
      return (async function* () {
        const mockMessage = "I am currently operating in offline mock mode because the AI API is unreachable. Please check the dashboard for the latest updates on your crops, weather, and market trends.";
        // Simulate a slight delay and stream the text
        const words = mockMessage.split(' ');
        for (const word of words) {
          await new Promise(resolve => setTimeout(resolve, 50));
          yield { text: word + ' ' };
        }
      })();
    }
  }

  async saveAssistantMessage(sessionId: string, content: string, latencyMs: number) {
    return this.chatRepo.addMessage({
      sessionId,
      role: MessageRole.ASSISTANT,
      content,
      llmMetadata: { tokensUsed: 0, latencyMs, model: 'gemini-3.5-flash-stream' }
    });
  }
}
