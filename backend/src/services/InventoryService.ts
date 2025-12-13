// TDD: GREEN PHASE - Minimal implementation to pass tests
import { PrismaClient } from '@prisma/client';

export interface PurchaseResult {
  success: boolean;
  message: string;
  newQuantity?: number;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export class InventoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async purchaseSweet(sweetId: number, quantity: number): Promise<PurchaseResult> {
    const sweet = await this.prisma.sweet.findUnique({
      where: { id: sweetId }
    });

    if (!sweet) {
      return {
        success: false,
        message: 'Sweet not found'
      };
    }

    if (sweet.quantity === 0) {
      return {
        success: false,
        message: 'Sweet is out of stock'
      };
    }

    if (sweet.quantity < quantity) {
      return {
        success: false,
        message: 'Insufficient stock available'
      };
    }

    const newQuantity = sweet.quantity - quantity;
    
    await this.prisma.sweet.update({
      where: { id: sweetId },
      data: { quantity: newQuantity }
    });

    return {
      success: true,
      message: 'Sweet purchased successfully',
      newQuantity
    };
  }

  async restockSweet(sweetId: number, quantity: number): Promise<PurchaseResult> {
    const sweet = await this.prisma.sweet.findUnique({
      where: { id: sweetId }
    });

    if (!sweet) {
      return {
        success: false,
        message: 'Sweet not found'
      };
    }

    const newQuantity = sweet.quantity + quantity;
    
    await this.prisma.sweet.update({
      where: { id: sweetId },
      data: { quantity: newQuantity }
    });

    return {
      success: true,
      message: 'Sweet restocked successfully',
      newQuantity
    };
  }

  async getInventoryStatus(): Promise<InventoryItem[]> {
    const sweets = await this.prisma.sweet.findMany({
      select: {
        id: true,
        name: true,
        quantity: true
      }
    });

    return sweets.map(sweet => ({
      ...sweet,
      status: this.getStockStatus(sweet.quantity)
    }));
  }

  async getLowStockItems(threshold: number = 5): Promise<InventoryItem[]> {
    const sweets = await this.prisma.sweet.findMany({
      where: {
        quantity: {
          lte: threshold
        }
      },
      select: {
        id: true,
        name: true,
        quantity: true
      }
    });

    return sweets.map(sweet => ({
      ...sweet,
      status: this.getStockStatus(sweet.quantity)
    }));
  }

  private getStockStatus(quantity: number): 'in-stock' | 'low-stock' | 'out-of-stock' {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= 5) return 'low-stock';
    return 'in-stock';
  }
}