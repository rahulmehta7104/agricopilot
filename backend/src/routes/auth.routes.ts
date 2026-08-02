import { Router } from 'express';
import passport from 'passport';
import { register, login, googleCallback, getMe } from '../controllers/auth.controller';
import { authLimiter } from '../middleware/rateLimiter';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: POST /api/auth/register
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/register', authLimiter, register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: POST /api/auth/login
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/login', authLimiter, login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: GET /api/auth/me
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/me', requireAuth, getMe as any);

// OAuth routes
/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: GET /api/auth/google
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: GET /api/auth/google/callback
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), googleCallback);

export default router;
