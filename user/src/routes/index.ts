import { Router } from 'express';
import userRoutes from './users';
import healthRoutes from './health';
import config from '../config';

const router = Router();

// Health check endpoint - publicly accessible
router.use('/health', healthRoutes);

// API routes with version prefix
const apiRouter = Router();
apiRouter.use('/users', userRoutes);

router.use(config.server.apiPrefix, apiRouter);

export default router;
