import { Router } from 'express';
import { registerUser, getUserProfile } from '../controllers/user.controller';
import { validateRequest } from '../middleware/validateRequest';
import { registerUserSchema } from '../validators/user.validator';

const router = Router();

router.post('/register', validateRequest(registerUserSchema), registerUser);
router.get('/:id/profile', getUserProfile);

export default router;
