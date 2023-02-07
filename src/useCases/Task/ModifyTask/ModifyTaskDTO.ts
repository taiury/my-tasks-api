import { z } from 'zod';

const modifyTaskSchema = z.object({
  taskId: z.number(),
  userId: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  finalized: z.boolean().optional(),
});

type ModifyTaskDTO = z.infer<typeof modifyTaskSchema>;

export { modifyTaskSchema, ModifyTaskDTO };
