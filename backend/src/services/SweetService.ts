// TDD: GREEN PHASE - Minimal implementation to pass tests
import { PrismaClient } from '@prisma/client';

export interface CreateSweetData {
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string | null;
}

export interface Sweet {
  id: number;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class SweetService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createSweet(data: CreateSweetData): Promise<Sweet> {
    return this.prisma.sweet.create({
      data
    });
  }

  async getAllSweets(): Promise<Sweet[]> {
    return this.prisma.sweet.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async searchSweets(searchTerm: string): Promise<Sweet[]> {
    return this.prisma.sweet.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
          { category: { contains: searchTerm } }
        ]
      }
    });
  }

  async getSweetById(id: number): Promise<Sweet | null> {
    return this.prisma.sweet.findUnique({
      where: { id }
    });
  }

  async updateSweet(id: number, data: Partial<CreateSweetData>): Promise<Sweet> {
    return this.prisma.sweet.update({
      where: { id },
      data
    });
  }

  async updateQuantity(id: number, quantity: number): Promise<Sweet> {
    return this.prisma.sweet.update({
      where: { id },
      data: { quantity }
    });
  }

  async deleteSweet(id: number): Promise<void> {
    await this.prisma.sweet.delete({
      where: { id }
    });
  }
}