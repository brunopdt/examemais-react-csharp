export const createRequiredError = (fieldName: string): string => {
  return `O campo ${fieldName} é obrigatório`;
};

export const createMinLengthError = (fieldName: string, min: number): string => {
  return `O campo ${fieldName} deve ter pelo menos ${min} caracteres`;
};

export const createMaxLengthError = (fieldName: string, max: number): string => {
  return `O campo ${fieldName} deve ter no máximo ${max} caracteres`;
};

export const INVALID_MAIL = "E-mail inválido";