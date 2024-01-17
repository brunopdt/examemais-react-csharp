import { z } from 'zod';
import { createRequiredError, createMaxLengthError, createMinLengthError, INVALID_MAIL } from '../../../common/constants/validation';

export const registerClinicSchema = z.object({
  clinicName: z.string({required_error: createRequiredError("nome")}).min(3, {message: createMinLengthError("nome", 3)}).max(255, {message: createMaxLengthError("nome", 255)}),
  address: z.string({required_error: createRequiredError("endereço")}).min(3, {message: createMinLengthError("endereço", 3)}).max(255, {message: createMaxLengthError("endereço", 255)}),
  cnpj: z.string({required_error: createRequiredError("CNPJ")}).min(14, {message: createMinLengthError("CNPJ", 14)}),
  email: z.string({required_error: createRequiredError("e-mail")}).min(3, {message: createMinLengthError("e-mail", 3)}).max(255, {message: createMaxLengthError("e-mail", 255)}).email({message: INVALID_MAIL}),
  password: z.string({required_error: createRequiredError("senha")}).min(8, {message: createMinLengthError("senha", 11)}).max(255, {message: createMaxLengthError("senha", 255)}),
});