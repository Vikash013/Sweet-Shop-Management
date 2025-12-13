// Shop controller for handling shop-related requests
import { Request, Response } from 'express';
import { ShopService } from '../services/ShopService';

export class ShopController {
  private shopService: ShopService;

  constructor() {
    this.shopService = new ShopService();
  }

  getAllShops = async (req: Request, res: Response): Promise<void> => {
    try {
      const { search } = req.query;
      const shops = await this.shopService.getAllShops(search as string);
      res.json(shops);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getShopById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const shop = await this.shopService.getShopById(parseInt(id));
      if (!shop) {
        res.status(404).json({ message: 'Shop not found' });
        return;
      }
      res.json(shop);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getShopSweets = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { search } = req.query;
      const sweets = await this.shopService.getShopSweets(parseInt(id), search as string);
      res.json(sweets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}