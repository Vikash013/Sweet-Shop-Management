// TDD: GREEN PHASE - Minimal implementation to pass tests
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface AuthPayload {
  userId: number;
  role: string;
}

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'sweet-shop-secret';
  private readonly SALT_ROUNDS = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: '24h' });
  }

  verifyToken(token: string): AuthPayload {
    return jwt.verify(token, this.JWT_SECRET) as AuthPayload;
  }
}