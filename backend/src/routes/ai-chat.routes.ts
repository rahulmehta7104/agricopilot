import { Router } from 'express';
import { startNewSession, handleUserMessage, getUserSessions } from '../controllers/ai-chat.controller';
import { validateRequest } from '../middleware/validateRequest';
import { startSessionSchema, sendMessageSchema } from '../validators/ai-chat.validator';

const router = Router();

// /api/chat/...
/**
 * @swagger
 * /api/chat/sessions:
 *   post:
 *     summary: POST /api/chat/sessions
 *     tags: [Chat]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/sessions', validateRequest(startSessionSchema), startNewSession);
/**
 * @swagger
 * /api/chat/users/{userId}/sessions:
 *   get:
 *     summary: GET /api/chat/users/{userId}/sessions
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/users/:userId/sessions', getUserSessions);
/**
 * @swagger
 * /api/chat/sessions/{sessionId}/messages:
 *   post:
 *     summary: POST /api/chat/sessions/{sessionId}/messages
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/sessions/:sessionId/messages', validateRequest(sendMessageSchema), handleUserMessage);

export default router;
