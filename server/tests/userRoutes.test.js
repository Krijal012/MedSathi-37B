import request from 'supertest';
import express from 'express';
import { router } from '../routes/userRoutes.js';

// Mock the middleware
jest.mock('../middleware/authMiddleware.js', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 1, role: 'admin' }; // Mock authenticated user
    next();
  },
  authorize: (role) => (req, res, next) => {
    if (req.user.role === role || req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Access denied' });
    }
  },
}));

// Mock the controllers
jest.mock('../controller/authController.js', () => ({
  register: jest.fn((req, res) => res.status(201).json({ success: true, message: 'User registered' })),
  login: jest.fn((req, res) => res.status(200).json({ success: true, token: 'mocktoken' })),
  getMe: jest.fn((req, res) => res.status(200).json({ success: true, user: req.user })),
  logout: jest.fn((req, res) => res.status(200).json({ success: true, message: 'Logged out' })),
}));

jest.mock('../controller/userController.js', () => ({
  getAllUsers: jest.fn((req, res) => res.status(200).json({ success: true, users: [] })),
  getUserById: jest.fn((req, res) => res.status(200).json({ success: true, user: { id: 1 } })),
  updateUser: jest.fn((req, res) => res.status(200).json({ success: true, message: 'Updated' })),
  deleteUser: jest.fn((req, res) => res.status(200).json({ success: true, message: 'Deleted' })),
}));

const app = express();
app.use(express.json());
app.use('/api/auth', router);

describe('User Routes', () => {
  it('should register a user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: 'pass' });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'pass' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should get current user', async () => {
    const response = await request(app)
      .get('/api/auth/me');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should get all users', async () => {
    const response = await request(app)
      .get('/api/auth/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should get user by id', async () => {
    const response = await request(app)
      .get('/api/auth/users/1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should update user', async () => {
    const response = await request(app)
      .put('/api/auth/users/1')
      .send({ name: 'Updated' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should delete user', async () => {
    const response = await request(app)
      .delete('/api/auth/users/1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
