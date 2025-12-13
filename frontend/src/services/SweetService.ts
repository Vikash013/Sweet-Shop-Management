// Sweet Service for API communication
import axios from 'axios';
import { Sweet, PurchaseRequest, PurchaseResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

export class SweetService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  constructor() {
    // Add token to requests if available
    const token = localStorage.getItem('token');
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  async getAllSweets(search?: string): Promise<Sweet[]> {
    const params = search ? { search } : {};
    const response = await this.api.get('/sweets', { params });
    return response.data;
  }

  async getSweetById(id: number): Promise<Sweet> {
    const response = await this.api.get(`/sweets/${id}`);
    return response.data;
  }

  async createSweet(sweetData: Omit<Sweet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sweet> {
    const response = await this.api.post('/sweets', sweetData);
    return response.data;
  }

  async updateSweet(id: number, sweetData: Partial<Sweet>): Promise<Sweet> {
    const response = await this.api.put(`/sweets/${id}`, sweetData);
    return response.data;
  }

  async deleteSweet(id: number): Promise<void> {
    await this.api.delete(`/sweets/${id}`);
  }

  async purchaseSweet(purchaseData: PurchaseRequest): Promise<PurchaseResponse> {
    const response = await this.api.post('/inventory/purchase', purchaseData);
    return response.data;
  }
}