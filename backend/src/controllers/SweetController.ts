// TDD: GREEN PHASE - Sweet controller implementation
import { Response } from 'express';
import { SweetService } from '../services/SweetService';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const createSweetSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  quantity: z.number().int().min(0),
  category: z.string().min(1),
  imageUrl: z.string().url().optional()
});

const updateSweetSchema = createSweetSchema.partial();

export class SweetController {
  private sweetService: SweetService;

  constructor() {
    this.sweetService = new SweetService();
  }

  createSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const validatedData = createSweetSchema.parse(req.body);
      const sweet = await this.sweetService.createSweet(validatedData);
      res.status(201).json(sweet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid input data', details: error.errors });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getAllSweets = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { search } = req.query;
      
      let sweets;
      if (search && typeof search === 'string') {
        sweets = await this.sweetService.searchSweets(search);
      } else {
        sweets = await this.sweetService.getAllSweets();
      }
      
      res.json(sweets);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getSweetById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sweet = await this.sweetService.getSweetById(id);
      
      if (!sweet) {
        res.status(404).json({ error: 'Sweet not found' });
        return;
      }
      
      res.json(sweet);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  updateSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateSweetSchema.parse(req.body);
      
      const sweet = await this.sweetService.updateSweet(id, validatedData);
      res.json(sweet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid input data', details: error.errors });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  deleteSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      await this.sweetService.deleteSweet(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}