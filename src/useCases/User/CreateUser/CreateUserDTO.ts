import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string(),
  name: z.string(),
  age: z.number(),
  email_code: z.number().optional(),
  password: z.string(),
});

type CreateUserDTO = z.infer<typeof createUserSchema>;

export { createUserSchema, CreateUserDTO };
