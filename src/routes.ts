import { Router } from 'express';
import authRoutes from './features/auth/auth.routes';

const router = Router();

router.use('/auth', authRoutes);
//router.use('/users', userRoutes); // add more

export default router;
