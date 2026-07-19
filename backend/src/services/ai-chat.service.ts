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

    // 3. Trigger AI Agent using history
    let aiResponseText = "I'm sorry, I couldn't process your request.";
    let tokensUsed = 0;
    const startTime = Date.now();

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your-gemini-api-key') {
         throw new Error("Gemini API key is not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = history.map(msg => ({
        role: msg.role === MessageRole.USER ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      // Add system instruction (agri context)
      const systemInstruction = "You are AgriCopilot, an expert agricultural AI assistant. Help the farmer with crop management, weather analysis, and general farming advice. Keep responses concise and practical.";

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction: systemInstruction,
        }
      });
      
      aiResponseText = response.text || "No response generated.";
      tokensUsed = response.usageMetadata?.totalTokenCount || 0;
    } catch (error: any) {
      console.error("AI API Error:", error);
      aiResponseText = `Error: ${error.message}`;
    }

    const latencyMs = Date.now() - startTime;

    // 4. Save AI response with token metadata for cost tracking
    const aiMsg = await this.chatRepo.addMessage({
      sessionId,
      role: MessageRole.ASSISTANT,
      content: aiResponseText,
      llmMetadata: { tokensUsed, latencyMs, model: 'gemini-3.5-flash' }
    });

    return { userMsg, aiMsg };
  }
}
