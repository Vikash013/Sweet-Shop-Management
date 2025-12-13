// Shop service for API calls
import axios from 'axios';
import { Shop, Sweet } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

export class ShopService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  async getAllShops(search?: string): Promise<Shop[]> {
    const params = search ? { search } : {};
    const response = await this.api.get('/shops', { params });
    return response.data;
  }

  async getShopById(id: number): Promise<Shop> {
    const response = await this.api.get(`/shops/${id}`);
    return response.data;
  }

  async getShopSweets(shopId: number, search?: string): Promise<Sweet[]> {
    const params = search ? { search } : {};
    const response = await this.api.get(`/shops/${shopId}/sweets`, { params });
    return response.data;
  }
}