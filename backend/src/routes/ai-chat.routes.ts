import { Router } from 'express';
import { startNewSession, handleUserMessage, getUserSessions } from '../controllers/ai-chat.controller';
import { validateRequest } from '../middleware/validateRequest';
import { startSessionSchema, sendMessageSchema } from '../validators/ai-chat.validator';

const router = Router();

// /api/chat/...
router.post('/sessions', validateRequest(startSessionSchema), startNewSession);
router.get('/users/:userId/sessions', getUserSessions);
router.post('/sessions/:sessionId/messages', validateRequest(sendMessageSchema), handleUserMessage);

export default router;
