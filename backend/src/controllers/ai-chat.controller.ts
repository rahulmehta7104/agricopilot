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
    const result = await chatService.handleUserMessage(sessionId, content);
    res.status(201).json({ status: 'success', data: result });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
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
