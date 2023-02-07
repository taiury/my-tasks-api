import { z } from 'zod';

const findUserSchema = z.object({
  userId: z.number(),
});

type FindUserDTO = z.infer<typeof findUserSchema>;

export { findUserSchema, FindUserDTO };
