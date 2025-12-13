// TDD: GREEN PHASE - Minimal AuthService implementation
import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterData } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

export class AuthService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await this.api.post('/auth/register', userData);
    this.setToken(response.data.token);
    return response.data;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.api.post('/auth/login', credentials);
    this.setToken(response.data.token);
    return response.data;
  }

  setToken(token: string): void {
    console.log('Setting token:', token);
    localStorage.setItem('token', token);
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    delete this.api.defaults.headers.common['Authorization'];
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Initialize token from localStorage on service creation
  constructor() {
    const token = this.getToken();
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
}