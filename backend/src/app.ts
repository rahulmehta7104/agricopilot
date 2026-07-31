import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Security Middlewares
app.use(helmet());

// Initialize Swagger Docs
import { setupSwagger } from './config/swagger';
setupSwagger(app);

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

import passport from './config/passport';
app.use(passport.initialize());

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check Endpoint
 *     description: Returns the health status of the API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is operational
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: AgriCopilot API is operational.
 */
// Health Check Endpoint (useful for AWS/Render/Docker orchestration)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'AgriCopilot API is operational.' });
});

// Mount all modular API routes under /api
app.use('/api', routes);

// 404 Handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// Centralized Error Handling Middleware (must be registered last)
app.use(errorHandler);

export default app;
