import { z } from 'zod';
import { signupSchema } from './SignupSchema';

export const editSchema = signupSchema.extend({
  profileImage: z.instanceof(File).optional(),
});

export type EditSchema = z.infer<typeof editSchema>;
