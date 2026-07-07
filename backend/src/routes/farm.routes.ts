import { Router } from 'express';
import { registerFarm, getFarmerFarms, addCropToFarm } from '../controllers/farm.controller';
import { validateRequest } from '../middleware/validateRequest';
import { registerFarmSchema, addCropToFarmSchema } from '../validators/farm.validator';

const router = Router();

// /api/farms/...
router.post('/', validateRequest(registerFarmSchema), registerFarm);
router.get('/profile/:profileId', getFarmerFarms);
router.post('/crops', validateRequest(addCropToFarmSchema), addCropToFarm);

export default router;
