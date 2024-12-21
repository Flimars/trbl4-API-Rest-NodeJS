import Joi from 'joi';

export const todoValidationSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'string.base': 'O campo título deve ser uma string.',
      'any.required': 'O campo título é obrigatório.',
    }),
  description: Joi.string()
    .allow('')
    .messages({
      'string.base': 'O campo descrição deve ser uma string.',
    }),
  dueDate: Joi.date()
    .required()
    .messages({
      'date.base': 'O campo dueDate deve ser uma data válida.',
      'any.required': 'O campo dueDate é obrigatório.',
    }),
  categoryId: Joi.number()
    .optional()
    .messages({
      'number.base': 'O campo categoryId deve ser um número.',
    }),
});
