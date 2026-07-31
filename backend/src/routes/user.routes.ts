import { Router } from 'express';
import { registerUser, getUserProfile } from '../controllers/user.controller';
import { validateRequest } from '../middleware/validateRequest';
import { registerUserSchema } from '../validators/user.validator';

const router = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: POST /api/users/register
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/register', validateRequest(registerUserSchema), registerUser);
/**
 * @swagger
 * /api/users/{id}/profile:
 *   get:
 *     summary: GET /api/users/{id}/profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id/profile', getUserProfile);

export default router;
