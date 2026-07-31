import { Router } from 'express';
import { registerFarm, getFarmerFarms, addCropToFarm, setupFarmProfile, deleteFarmCrop } from '../controllers/farm.controller';
import { validateRequest } from '../middleware/validateRequest';
import { registerFarmSchema, addCropToFarmSchema } from '../validators/farm.validator';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// /api/farms/...
/**
 * @swagger
 * /api/farms/setup:
 *   post:
 *     summary: POST /api/farms/setup
 *     tags: [Farms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/setup', requireAuth as any, setupFarmProfile);
/**
 * @swagger
 * /api/farms:
 *   post:
 *     summary: POST /api/farms
 *     tags: [Farms]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', validateRequest(registerFarmSchema), registerFarm);
/**
 * @swagger
 * /api/farms/profile/{profileId}:
 *   get:
 *     summary: GET /api/farms/profile/{profileId}
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/profile/:profileId', getFarmerFarms);
/**
 * @swagger
 * /api/farms/crops:
 *   post:
 *     summary: POST /api/farms/crops
 *     tags: [Farms]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/crops', validateRequest(addCropToFarmSchema), addCropToFarm);
/**
 * @swagger
 * /api/farms/crops/{farmCropId}:
 *   delete:
 *     summary: DELETE /api/farms/crops/{farmCropId}
 *     tags: [Farms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: farmCropId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/crops/:farmCropId', requireAuth as any, deleteFarmCrop);

export default router;
