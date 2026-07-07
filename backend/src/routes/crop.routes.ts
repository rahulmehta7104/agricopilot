import { Router } from 'express';
import { getAllCrops } from '../controllers/crop.controller';

const router = Router();

router.get('/', getAllCrops);

export default router;
