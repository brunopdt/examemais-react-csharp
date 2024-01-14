import { z } from 'zod';
import { createRequiredError, createMaxLengthError, createMinLengthError, INVALID_MAIL } from '../../../common/constants/validation';

export const registerPatientSchema = z.object({
  fullName: z.string({required_error: createRequiredError("nome")}).min(3, {message: createMinLengthError("nome", 3)}).max(255, {message: createMaxLengthError("nome", 255)}),
  email: z.string({required_error: createRequiredError("e-mail")}).min(3, {message: createMinLengthError("e-mail", 3)}).max(255, {message: createMaxLengthError("e-mail", 255)}).email({message: INVALID_MAIL}),
  cpf: z.string({required_error: createRequiredError("CPF")}).min(11, {message: createMinLengthError("CPF", 11)}),
  password: z.string({required_error: createRequiredError("senha")}).min(8, {message: createMinLengthError("senha", 11)}).max(255, {message: createMaxLengthError("senha", 255)}),
});