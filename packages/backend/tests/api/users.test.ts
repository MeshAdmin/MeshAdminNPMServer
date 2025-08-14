import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from '@api/index';

describe('Users API', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();

    // Setup middleware
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Setup routes
    app.use('/api', apiRoutes);
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/api/users').expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);

      // Check user structure
      const user = response.body.data[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      const response = await request(app).get('/api/users/1').expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('email');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/999').expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 for invalid user id', async () => {
      const response = await request(app).get('/api/users/invalid').expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Invalid user ID');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const response = await request(app).post('/api/users').send(userData).expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('name', userData.name);
      expect(response.body.data).toHaveProperty('email', userData.email);
      expect(response.body.data).toHaveProperty('createdAt');
      expect(response.body.data).toHaveProperty('updatedAt');
    });

    it('should return 400 when name is missing', async () => {
      const userData = {
        email: 'test@example.com',
      };

      const response = await request(app).post('/api/users').send(userData).expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Name and email are required');
    });

    it('should return 400 when email is missing', async () => {
      const userData = {
        name: 'Test User',
      };

      const response = await request(app).post('/api/users').send(userData).expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Name and email are required');
    });

    it('should return 400 for invalid email format', async () => {
      const userData = {
        name: 'Test User',
        email: 'invalid-email',
      };

      const response = await request(app).post('/api/users').send(userData).expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Invalid email format');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update existing user', async () => {
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const response = await request(app).put('/api/users/1').send(updateData).expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('name', updateData.name);
      expect(response.body.data).toHaveProperty('email', updateData.email);
    });

    it('should return 404 for non-existent user', async () => {
      const updateData = {
        name: 'Updated Name',
      };

      const response = await request(app).put('/api/users/999').send(updateData).expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 for invalid email format', async () => {
      const updateData = {
        email: 'invalid-email',
      };

      const response = await request(app).put('/api/users/1').send(updateData).expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Invalid email format');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete existing user', async () => {
      await request(app).delete('/api/users/2').expect(204); // 204 No Content - no response body expected
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).delete('/api/users/999').expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health').expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('status', 'OK');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('uptime');
      expect(response.body.data).toHaveProperty('environment');
    });
  });

  describe('GET /api/nonexistent', () => {
    it('should return 404 for non-existent API endpoints', async () => {
      const response = await request(app).get('/api/nonexistent').expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'API endpoint not found');
    });
  });
});
