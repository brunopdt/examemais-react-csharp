import { z } from 'zod';
import { createRequiredError } from '../../../common/constants/validation';

export const loginSchema = z.object({
  email: z.string({required_error: createRequiredError("e-mail")}).min(3, {message: createRequiredError("e-mail")}),
  password: z.string({required_error: createRequiredError("senha")}).min(3, {message: createRequiredError("senha")})
});