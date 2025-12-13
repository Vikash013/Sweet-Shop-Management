// TDD: RED PHASE - Frontend Auth Service Tests
import { AuthService } from '../src/services/AuthService';

// Mock axios
jest.mock('axios');

describe('AuthService - TDD', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    localStorage.clear();
  });

  describe('Authentication Methods', () => {
    // RED: This test will fail initially
    it('should register user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const mockResponse = {
        token: 'mock-jwt-token',
        user: { id: 1, email: userData.email, name: userData.name, role: 'user' }
      };

      const result = await authService.register(userData);
      
      expect(result).toEqual(mockResponse);
    });

    // RED: This test will fail initially
    it('should login user successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockResponse = {
        token: 'mock-jwt-token',
        user: { id: 1, email: credentials.email, name: 'Test User', role: 'user' }
      };

      const result = await authService.login(credentials);
      
      expect(result).toEqual(mockResponse);
    });

    // RED: This test will fail initially
    it('should store token in localStorage on successful auth', async () => {
      const token = 'test-token';
      
      authService.setToken(token);
      
      expect(localStorage.getItem('token')).toBe(token);
    });

    // RED: This test will fail initially
    it('should retrieve token from localStorage', () => {
      const token = 'stored-token';
      localStorage.setItem('token', token);
      
      const retrievedToken = authService.getToken();
      
      expect(retrievedToken).toBe(token);
    });

    // RED: This test will fail initially
    it('should remove token on logout', () => {
      localStorage.setItem('token', 'some-token');
      
      authService.logout();
      
      expect(localStorage.getItem('token')).toBeNull();
    });

    // RED: This test will fail initially
    it('should check if user is authenticated', () => {
      // Not authenticated
      expect(authService.isAuthenticated()).toBe(false);
      
      // Authenticated
      localStorage.setItem('token', 'valid-token');
      expect(authService.isAuthenticated()).toBe(true);
    });
  });
});