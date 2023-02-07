import { z } from 'zod';

const modifyUserSchema = z.object({
  userId: z.number(),
  name: z.string().optional(),
  age: z.number().optional(),
  password: z.string().optional(),
});

type ModifyUserDTO = z.infer<typeof modifyUserSchema>;

export { modifyUserSchema, ModifyUserDTO };
