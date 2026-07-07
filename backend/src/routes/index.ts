import { Router } from 'express';
import userRoutes from './user.routes';
import farmRoutes from './farm.routes';
import recommendationRoutes from './recommendation.routes';
import aiChatRoutes from './ai-chat.routes';

const router = Router();

// Mount all modular routers onto their respective base paths
router.use('/users', userRoutes);
router.use('/farms', farmRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/chat', aiChatRoutes);

export default router;
