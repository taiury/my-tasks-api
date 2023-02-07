import { z } from 'zod';

const createTaskSchema = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.string().optional(),
});

type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export { createTaskSchema, CreateTaskDTO };
