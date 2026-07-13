import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma'; // Assuming prisma is exported from here

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ status: 'error', message: 'Unauthorized. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ status: 'error', message: 'Unauthorized. Malformed token.' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
    const decoded = jwt.verify(token, secret) as { id: string; role?: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        name: true,
      }
    });

    if (!user) {
      res.status(401).json({ status: 'error', message: 'Unauthorized. User not found.' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ status: 'error', message: 'Unauthorized. Token expired.' });
    } else {
      res.status(401).json({ status: 'error', message: 'Unauthorized. Invalid token.' });
    }
  }
};
