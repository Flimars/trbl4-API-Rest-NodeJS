import Joi from 'joi';

export const todoValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  dueDate: Joi.date().required(),
  categoryId: Joi.number().optional(),
});
