import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // Check for duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      res.status(400).json({ status: 'error', message: 'User with this email already exists' });
      return;
    }

    // Hash password (10-12 salt rounds)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name || null,
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', message: 'Validation error', errors: (error as z.ZodError).issues });
    } else {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (!user || !user.password) {
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(validatedData.password, user.password);
    if (!isMatch) {
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
      return;
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      token,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', message: 'Validation error', errors: (error as z.ZodError).issues });
    } else {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
};

export const googleCallback = async (req: Request, res: Response): Promise<void> => {
  // Successful authentication, generate JWT
  const user = req.user as any;
  const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
  const token = jwt.sign(
    { id: user.id, role: user.role },
    secret,
    { expiresIn: '7d' }
  );

  // Redirect to frontend with token
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/login?token=${token}`);
};
