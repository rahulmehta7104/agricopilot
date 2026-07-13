import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Security Middlewares
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: '*', // In production, restrict this to your specific frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

import passport from './config/passport';
app.use(passport.initialize());

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
