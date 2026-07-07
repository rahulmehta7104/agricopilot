import { Router } from 'express';
import { getAllCrops, getCropById, createCrop, updateCrop, deleteCrop } from '../controllers/crop.controller';

const router = Router();

router.get('/', getAllCrops);
router.get('/:id', getCropById);
router.post('/', createCrop);
router.put('/:id', updateCrop);
router.delete('/:id', deleteCrop);

export default router;
