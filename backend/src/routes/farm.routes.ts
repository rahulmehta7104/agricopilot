import { Router } from 'express';
import { registerFarm, getFarmerFarms, addCropToFarm, setupFarmProfile } from '../controllers/farm.controller';
import { validateRequest } from '../middleware/validateRequest';
import { registerFarmSchema, addCropToFarmSchema } from '../validators/farm.validator';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// /api/farms/...
router.post('/setup', requireAuth as any, setupFarmProfile);
router.post('/', validateRequest(registerFarmSchema), registerFarm);
router.get('/profile/:profileId', getFarmerFarms);
router.post('/crops', validateRequest(addCropToFarmSchema), addCropToFarm);

export default router;
