import { z } from "zod"

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, { error: 'Username must be at least 3 characters long' }),
    email: z.email({ error: 'Invalid email address' }),
    password: z.string().min(6, { error: 'Password must be at least 6 characters long' })
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email({ error: 'Invalid email address' }),
    password: z.string().min(1, { error: 'Password is required' })
  })
});