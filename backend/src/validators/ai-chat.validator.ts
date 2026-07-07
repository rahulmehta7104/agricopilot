import { z } from 'zod';

export const startSessionSchema = z.object({
  userId: z.string().uuid("Invalid User ID"),
  title: z.string().min(1, "Title is required").optional().default("New Chat"),
});

export const sendMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
});
