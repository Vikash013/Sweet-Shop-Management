// TDD: GREEN PHASE - Inventory controller implementation
import { Response } from 'express';
import { InventoryService } from '../services/InventoryService';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const purchaseSchema = z.object({
  sweetId: z.number().int().positive(),
  quantity: z.number().int().positive()
});

const restockSchema = z.object({
  sweetId: z.number().int().positive(),
  quantity: z.number().int().positive()
});

export class InventoryController {
  private inventoryService: InventoryService;

  constructor() {
    this.inventoryService = new InventoryService();
  }

  purchaseSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const validatedData = purchaseSchema.parse(req.body);
      const result = await this.inventoryService.purchaseSweet(
        validatedData.sweetId,
        validatedData.quantity
      );
      
      if (!result.success) {
        res.status(400).json(result);
        return;
      }
      
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid input data', details: error.errors });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  restockSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const validatedData = restockSchema.parse(req.body);
      const result = await this.inventoryService.restockSweet(
        validatedData.sweetId,
        validatedData.quantity
      );
      
      if (!result.success) {
        res.status(400).json(result);
        return;
      }
      
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid input data', details: error.errors });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getInventoryStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const inventory = await this.inventoryService.getInventoryStatus();
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getLowStockItems = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const threshold = req.query.threshold ? parseInt(req.query.threshold as string) : 5;
      const lowStockItems = await this.inventoryService.getLowStockItems(threshold);
      res.json(lowStockItems);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}