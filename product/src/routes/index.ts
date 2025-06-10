import { Router } from 'express';
import healthRoutes from './health';
import productRoutes from './product';
import config from '../config';

const router = Router();

// Health check endpoint - publicly accessible
router.use('/health', healthRoutes);

// API routes with version prefix
const apiRouter = Router();

apiRouter.use('/product', productRoutes);

router.use(config.server.apiPrefix, apiRouter);

export default router;
