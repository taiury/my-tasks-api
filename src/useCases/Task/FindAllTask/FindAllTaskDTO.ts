import { z } from 'zod';

const findAllTaskSchema = z.object({ userId: z.number() });

type FindAllTaskDTO = z.infer<typeof findAllTaskSchema>;

export { findAllTaskSchema, FindAllTaskDTO };
