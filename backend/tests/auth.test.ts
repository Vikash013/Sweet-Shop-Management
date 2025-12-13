// TDD: RED PHASE - Write failing tests first
import request from 'supertest';
import { app } from '../src/app';
import { AuthService } from '../src/services/AuthService';

describe('Authentication System - TDD', () => {
  describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
      authService = new AuthService();
    });

    // RED: This test will fail initially
    it('should hash password correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await authService.hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(0);
    });

    // RED: This test will fail initially
    it('should verify password correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await authService.hashPassword(password);
      
      const isValid = await authService.verifyPassword(password, hashedPassword);
      expect(isValid).toBe(true);
      
      const isInvalid = await authService.verifyPassword('wrongPassword', hashedPassword);
      expect(isInvalid).toBe(false);
    });

    // RED: This test will fail initially
    it('should generate JWT token', () => {
      const payload = { userId: 1, role: 'user' };
      const token = authService.generateToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    // RED: This test will fail initially
    it('should verify JWT token', () => {
      const payload = { userId: 1, role: 'user' };
      const token = authService.generateToken(payload);
      
      const decoded = authService.verifyToken(token);
      expect(decoded).toMatchObject(payload);
    });
  });

  describe('Auth API Endpoints', () => {
    // RED: These tests will fail initially
    describe('POST /api/auth/register', () => {
      it('should register a new user', async () => {
        const userData = {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        };

        const response = await request(app)
          .post('/api/auth/register')
          .send(userData)
          .expect(201);

        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.email).toBe(userData.email);
        expect(response.body.user).not.toHaveProperty('password');
      });

      it('should not register user with invalid email', async () => {
        const userData = {
          email: 'invalid-email',
          password: 'password123',
          name: 'Test User'
        };

        await request(app)
          .post('/api/auth/register')
          .send(userData)
          .expect(400);
      });
    });

    describe('POST /api/auth/login', () => {
      it('should login existing user', async () => {
        // First register a user
        const userData = {
          email: 'login@example.com',
          password: 'password123',
          name: 'Login User'
        };

        await request(app)
          .post('/api/auth/register')
          .send(userData);

        // Then login
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: userData.email,
            password: userData.password
          })
          .expect(200);

        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
      });

      it('should not login with wrong credentials', async () => {
        await request(app)
          .post('/api/auth/login')
          .send({
            email: 'nonexistent@example.com',
            password: 'wrongpassword'
          })
          .expect(401);
      });
    });
  });
});