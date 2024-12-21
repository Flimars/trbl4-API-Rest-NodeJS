import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'O nome deve ser um texto.',
    'string.empty': 'O nome é obrigatório.',
    'string.min': 'O nome deve ter pelo menos 3 caracteres.',
    'string.max': 'O nome não pode exceder 30 caracteres.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'O email deve ser válido.',
    'string.empty': 'O email é obrigatório.',
  }),
  password: Joi.string().min(6).max(50).required().messages({
    'string.min': 'A senha deve ter pelo menos 6 caracteres.',
    'string.max': 'A senha não pode exceder 50 caracteres.',
    'string.empty': 'A senha é obrigatória.',
  }),
});
