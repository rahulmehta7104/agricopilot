import { z } from 'zod';

export const recommendationActionSchema = z.object({
  action: z.enum(['ACCEPT', 'REJECT']),
});
