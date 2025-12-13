// Shop service for business logic
import { PrismaClient } from '@prisma/client';

export class ShopService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllShops(search?: string) {
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    return await this.prisma.shop.findMany({
      where,
      include: {
        _count: {
          select: { sweets: true }
        }
      }
    });
  }

  async getShopById(id: number) {
    return await this.prisma.shop.findUnique({
      where: { id },
      include: {
        sweets: true,
        _count: {
          select: { sweets: true }
        }
      }
    });
  }

  async getShopSweets(shopId: number, search?: string) {
    const where: any = { shopId };
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { category: { contains: search, mode: 'insensitive' as const } }
      ];
    }

    return await this.prisma.sweet.findMany({
      where,
      include: {
        shop: true
      }
    });
  }
}