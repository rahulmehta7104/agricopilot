import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AgriCopilot API',
      version: '1.0.0',
      description: 'API documentation for the AgriCopilot backend services',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
      {
        url: 'https://agricopilot-backend.onrender.com',
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.ts', './src/app.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Swagger docs available at /docs');
};
