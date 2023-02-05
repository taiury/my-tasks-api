import { z } from 'zod';

const enableSchema = z.object({
  email: z.string(),
  code: z.number(),
});

type EnableDTO = z.infer<typeof enableSchema>;

export { enableSchema, EnableDTO };
