import { Request, Response } from 'express';
import { AiChatService } from '../services/ai-chat.service';

const chatService = new AiChatService();

export const startNewSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, title } = req.body;
    const session = await chatService.startNewSession(userId, title);
    res.status(201).json({ status: 'success', data: session });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const handleUserMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.params.sessionId as string;
    const { content } = req.body;
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const startTime = Date.now();
    const responseStream = await chatService.handleUserMessageStream(sessionId, content);
    
    let fullResponse = '';
    
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullResponse += chunk.text;
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }
    
    const latencyMs = Date.now() - startTime;
    await chatService.saveAssistantMessage(sessionId, fullResponse, latencyMs);
    
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    if (!res.headersSent) {
      res.status(400).json({ status: 'error', message: error.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
};

export const getUserSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId as string;
    const sessions = await chatService.getUserSessions(userId);
    res.status(200).json({ status: 'success', data: sessions });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
