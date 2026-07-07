import { z } from 'zod';
import { Unit, CropStatus } from '@prisma/client';

export const registerFarmSchema = z.object({
  profileId: z.string().uuid("Invalid Profile ID"),
  name: z.string().min(2, "Farm name must be at least 2 characters"),
  size: z.number().positive("Farm size must be a positive number"),
  unit: z.nativeEnum(Unit).optional(),
});

export const addCropToFarmSchema = z.object({
  farmId: z.string().uuid("Invalid Farm ID"),
  cropId: z.string().uuid("Invalid Crop ID"),
  status: z.nativeEnum(CropStatus).optional(),
  season: z.string().optional(),
  cropCycle: z.string().optional(),
  expectedHarvestDate: z.string().datetime("Must be a valid ISO-8601 datetime string").optional(),
  yieldEstimate: z.number().positive("Yield estimate must be positive").optional(),
});
