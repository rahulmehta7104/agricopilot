import { z } from 'zod';
import { Role, Unit } from '@prisma/client';

export const registerUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
  preferredLanguage: z.string().optional(),
  preferredUnits: z.nativeEnum(Unit).optional(),
  timezone: z.string().optional(),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  totalLandHolding: z.number().positive("Land holding must be positive").optional(),
});
