import Joi from 'joi';

export const categoryValidationSchema = Joi.object({
  name: Joi.string().required(),
});
