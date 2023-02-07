import { z } from 'zod';

const enableAccountSchema = z.object({
  email: z.string(),
  code: z.number(),
});

type EnableAccountDTO = z.infer<typeof enableAccountSchema>;

export { enableAccountSchema, EnableAccountDTO };
