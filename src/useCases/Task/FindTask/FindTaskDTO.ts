import { z } from 'zod';

const findTaskSchema = z.object({
  userId: z.number(),
  taskId: z.number(),
});

type FindTaskDTO = z.infer<typeof findTaskSchema>;

export { findTaskSchema, FindTaskDTO };
