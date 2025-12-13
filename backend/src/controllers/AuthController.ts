// TDD: GREEN PHASE - Auth controller implementation
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/AuthService';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(['user', 'admin']).optional().default('user')
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export class AuthController {
  private prisma: PrismaClient;
  private authService: AuthService;

  constructor() {
    this.prisma = new PrismaClient();
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: validatedData.email }
      });

      if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
      }

      // Hash password and create user
      const hashedPassword = await this.authService.hashPassword(validatedData.password);
      
      const user = await this.prisma.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          name: validatedData.name,
          role: validatedData.role.toUpperCase() as 'USER' | 'ADMIN'
        }
      });

      // Generate token
      const token = this.authService.generateToken({
        userId: user.id,
        role: user.role.toLowerCase()
      });

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.toLowerCase()
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid input data', details: error.errors });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = loginSchema.parse(req.body);

      // Find user
      const user = await this.prisma.user.findUnique({
        where: { email: validatedData.email }
      });

      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Verify password
      const isValidPassword = await this.authService.verifyPassword(
        validatedData.password,
        user.password
      );

      if (!isValidPassword) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Generate token
      const token = this.authService.generateToken({
        userId: user.id,
        role: user.role.toLowerCase()
      });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.toLowerCase()
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid input data', details: error.errors });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}