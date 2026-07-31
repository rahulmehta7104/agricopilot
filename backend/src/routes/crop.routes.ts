import { Router } from 'express';
import { getAllCrops, getCropById, createCrop, updateCrop, deleteCrop } from '../controllers/crop.controller';

const router = Router();

/**
 * @swagger
 * /api/crops:
 *   get:
 *     summary: GET /api/crops
 *     tags: [Crops]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', getAllCrops);
/**
 * @swagger
 * /api/crops/{id}:
 *   get:
 *     summary: GET /api/crops/{id}
 *     tags: [Crops]
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
router.get('/:id', getCropById);
/**
 * @swagger
 * /api/crops:
 *   post:
 *     summary: POST /api/crops
 *     tags: [Crops]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', createCrop);
/**
 * @swagger
 * /api/crops/{id}:
 *   put:
 *     summary: PUT /api/crops/{id}
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
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
router.put('/:id', updateCrop);
/**
 * @swagger
 * /api/crops/{id}:
 *   delete:
 *     summary: DELETE /api/crops/{id}
 *     tags: [Crops]
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
router.delete('/:id', deleteCrop);

export default router;
