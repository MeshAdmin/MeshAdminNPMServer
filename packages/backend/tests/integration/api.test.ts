import request from 'supertest';
import express from 'express';
import { Server } from 'http';
import { databaseService } from '@services/database.service';
import { authService } from '@services/auth.service';

// Mock database service
jest.mock('@services/database.service');
jest.mock('@services/auth.service');

describe('API Integration Tests', () => {
  let app: express.Application;
  let server: Server;
  let authToken: string;

  beforeAll(async () => {
    // Setup Express app with minimal configuration
    app = express();
    app.use(express.json());
    
    // Mock database connection
    (databaseService.connect as jest.Mock).mockResolvedValue(undefined);
    (databaseService.healthCheck as jest.Mock).mockResolvedValue(true);
    
    // Import routes after mocking
    const apiRoutes = require('@routes/index').default;
    app.use('/api', apiRoutes);
    
    // Create test server
    server = app.listen(0);
    
    // Generate test auth token
    authToken = 'Bearer test-token';
    (authService.validateToken as jest.Mock).mockResolvedValue({
      id: 'test-user-id',
      email: 'test@example.com',
    });
  });

  afterAll(async () => {
    server.close();
    await databaseService.disconnect();
  });

  describe('Health Check Endpoints', () => {
    it('GET /api/health should return server health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'healthy',
        services: {
          database: 'connected',
          redis: expect.any(String),
        },
        timestamp: expect.any(String),
      });
    });

    it('GET /api/health should return unhealthy when database is down', async () => {
      (databaseService.healthCheck as jest.Mock).mockResolvedValueOnce(false);

      const response = await request(app)
        .get('/api/health')
        .expect(503);

      expect(response.body).toMatchObject({
        status: 'unhealthy',
        services: {
          database: 'disconnected',
        },
      });
    });
  });

  describe('Authentication Endpoints', () => {
    describe('POST /api/auth/register', () => {
      it('should register a new user', async () => {
        const newUser = {
          email: 'newuser@example.com',
          password: 'SecurePassword123!',
          name: 'New User',
        };

        const response = await request(app)
          .post('/api/auth/register')
          .send(newUser)
          .expect(201);

        expect(response.body).toMatchObject({
          success: true,
          message: 'User registered successfully',
          data: {
            user: {
              email: newUser.email,
              name: newUser.name,
            },
            tokens: {
              accessToken: expect.any(String),
              refreshToken: expect.any(String),
            },
          },
        });
      });

      it('should validate registration input', async () => {
        const invalidUser = {
          email: 'invalid-email',
          password: '123', // Too short
        };

        const response = await request(app)
          .post('/api/auth/register')
          .send(invalidUser)
          .expect(400);

        expect(response.body).toMatchObject({
          success: false,
          message: expect.stringContaining('validation'),
        });
      });
    });

    describe('POST /api/auth/login', () => {
      it('should login with valid credentials', async () => {
        const credentials = {
          email: 'test@example.com',
          password: 'password123',
        };

        const response = await request(app)
          .post('/api/auth/login')
          .send(credentials)
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          message: 'Login successful',
          data: {
            user: {
              email: credentials.email,
            },
            tokens: {
              accessToken: expect.any(String),
              refreshToken: expect.any(String),
            },
          },
        });
      });

      it('should reject invalid credentials', async () => {
        const invalidCredentials = {
          email: 'test@example.com',
          password: 'wrongpassword',
        };

        const response = await request(app)
          .post('/api/auth/login')
          .send(invalidCredentials)
          .expect(401);

        expect(response.body).toMatchObject({
          success: false,
          message: 'Invalid email or password',
        });
      });
    });

    describe('POST /api/auth/logout', () => {
      it('should logout authenticated user', async () => {
        const response = await request(app)
          .post('/api/auth/logout')
          .set('Authorization', authToken)
          .expect(200);

        expect(response.body).toMatchObject({
          success: true,
          message: 'Logout successful',
        });
      });

      it('should reject logout without authentication', async () => {
        const response = await request(app)
          .post('/api/auth/logout')
          .expect(401);

        expect(response.body).toMatchObject({
          success: false,
          message: 'Authentication required',
        });
      });
    });
  });

  describe('Protected Routes', () => {
    it('should access protected route with valid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', authToken)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: {
          id: 'test-user-id',
          email: 'test@example.com',
        },
      });
    });

    it('should reject access without token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Authentication required',
      });
    });

    it('should reject access with invalid token', async () => {
      (authService.validateToken as jest.Mock).mockRejectedValueOnce(
        new Error('Invalid token')
      );

      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Invalid token',
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/non-existent-endpoint')
        .expect(404);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Route not found',
      });
    });

    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }')
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        message: expect.stringContaining('JSON'),
      });
    });

    it('should handle server errors gracefully', async () => {
      // Mock an internal error
      (databaseService.healthCheck as jest.Mock).mockRejectedValueOnce(
        new Error('Database connection lost')
      );

      const response = await request(app)
        .get('/api/health')
        .expect(500);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Internal server error',
      });
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      // Make multiple requests quickly
      const requests = Array(11).fill(null).map(() =>
        request(app).get('/api/health')
      );

      const responses = await Promise.all(requests);
      const tooManyRequests = responses.filter(r => r.status === 429);

      expect(tooManyRequests.length).toBeGreaterThan(0);
    });
  });

  describe('CORS', () => {
    it('should handle CORS preflight requests', async () => {
      const response = await request(app)
        .options('/api/auth/login')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST')
        .expect(204);

      expect(response.headers['access-control-allow-origin']).toBeDefined();
      expect(response.headers['access-control-allow-methods']).toContain('POST');
    });
  });
});
