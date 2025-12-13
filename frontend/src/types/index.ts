// Type definitions for Sweet Shop Management System
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Shop {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  rating: number;
  address: string;
  phone?: string;
  isOpen: boolean;
  _count?: {
    sweets: number;
  };
}

export interface Sweet {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string;
  shopId: number;
  shop?: Shop;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'user' | 'admin';
}

export interface PurchaseRequest {
  sweetId: number;
  quantity: number;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  newQuantity?: number;
}