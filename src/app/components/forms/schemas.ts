import * as z from 'zod';

export const registerSchema = z.object({
  first_name: z.string().min(1, { error: 'First name is required.' }).trim(),
  last_name: z.string().min(1, { error: 'Last name is required.' }).trim(),
  email: z
    .email({ error: 'Invalid email address.' })
    .min(1, { error: 'Email is required' })

    .trim(),
  password: z.string().min(1, { error: 'Password is required.' }).trim(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email({ error: 'Invalid email address.' }).trim(),
  password: z.string().min(1, { error: 'Password is required.' }).trim(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
