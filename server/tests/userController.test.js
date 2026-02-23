import { jest } from '@jest/globals';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controller/userController.js';

// Mock the User model
jest.mock('../model/userModel.js', () => ({
  User: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

import { User } from '../model/userModel.js';

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users excluding password', async () => {
      const mockUsers = [
        { id: 1, name: 'John', email: 'john@example.com', role: 'patient' },
        { id: 2, name: 'Jane', email: 'jane@example.com', role: 'admin' },
      ];
      User.findAll.mockResolvedValue(mockUsers);

      await getAllUsers(req, res);

      expect(User.findAll).toHaveBeenCalledWith({
        attributes: { exclude: ['password'] },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        users: mockUsers,
      });
    });

    it('should handle errors', async () => {
      User.findAll.mockRejectedValue(new Error('DB error'));

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch users',
        error: 'DB error',
      });
    });
  });

  describe('getUserById', () => {
    it('should return user if found and authorized', async () => {
      req.params = { id: '1' };
      req.user = { id: 1, role: 'patient' };
      const mockUser = { id: 1, name: 'John', email: 'john@example.com', role: 'patient' };
      User.findByPk.mockResolvedValue(mockUser);

      await getUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith('1', {
        attributes: { exclude: ['password'] },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: mockUser,
      });
    });

    it('should return 404 if user not found', async () => {
      req.params = { id: '1' };
      req.user = { id: 1, role: 'patient' };
      User.findByPk.mockResolvedValue(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found',
      });
    });

    it('should return 403 if not authorized', async () => {
      req.params = { id: '2' };
      req.user = { id: 1, role: 'patient' };
      const mockUser = { id: 2, name: 'Jane', email: 'jane@example.com', role: 'patient' };
      User.findByPk.mockResolvedValue(mockUser);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied',
      });
    });
  });

  describe('updateUser', () => {
    it('should update user if authorized', async () => {
      req.params = { id: '1' };
      req.user = { id: 1, role: 'patient' };
      req.body = { name: 'John Updated' };
      const mockUser = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        role: 'patient',
        update: jest.fn().mockResolvedValue(),
      };
      User.findByPk.mockResolvedValue(mockUser);

      await updateUser(req, res);

      expect(mockUser.update).toHaveBeenCalledWith({ name: 'John Updated' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User updated successfully',
        user: {
          id: 1,
          name: 'John',
          email: 'john@example.com',
          role: 'patient',
        },
      });
    });

    it('should not update password or role', async () => {
      req.params = { id: '1' };
      req.user = { id: 1, role: 'patient' };
      req.body = { name: 'John', password: 'newpass', role: 'admin' };
      const mockUser = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        role: 'patient',
        update: jest.fn().mockResolvedValue(),
      };
      User.findByPk.mockResolvedValue(mockUser);

      await updateUser(req, res);

      expect(mockUser.update).toHaveBeenCalledWith({ name: 'John' });
    });
  });

  describe('deleteUser', () => {
    it('should delete user if found', async () => {
      req.params = { id: '1' };
      const mockUser = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(),
      };
      User.findByPk.mockResolvedValue(mockUser);

      await deleteUser(req, res);

      expect(mockUser.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User deleted successfully',
      });
    });

    it('should return 404 if user not found', async () => {
      req.params = { id: '1' };
      User.findByPk.mockResolvedValue(null);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found',
      });
    });
  });
});
