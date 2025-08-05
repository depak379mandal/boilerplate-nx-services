import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const registerSchema = z.object({
  name: z
    .string('Name is required')
    .min(1, { message: 'Name should be at least 1 character' }),
});
