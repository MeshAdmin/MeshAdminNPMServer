import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import logger from '@lib/logger';

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'MeshAdmin API',
        version: '1.0.0',
        description: 'MeshAdmin Backend API Documentation',
        contact: {
          name: 'API Support',
          email: 'support@meshadmin.com',
        },
      },
      servers: [
        {
          url: process.env.API_URL || 'http://localhost:5000',
          description: 'API Server',
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
    apis: [
      './src/routes/*.ts',
      './src/api/routes/*.ts',
      './src/api/controllers/*.ts',
    ],
  };

  const swaggerSpec = swaggerJsdoc(options);

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'MeshAdmin API Documentation',
  }));

  // Serve raw OpenAPI spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  logger.info('📚 API Documentation available at /api-docs');
};

export default setupSwagger;
