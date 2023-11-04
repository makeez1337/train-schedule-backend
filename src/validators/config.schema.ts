import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.required(),
  DATABASE_URL: Joi.required(),
  BCRYPT_SALT: Joi.required(),
  JWT_ACCESS_SECRET: Joi.required(),
  JWT_REFRESH_SECRET: Joi.required(),
  JWT_ACCESS_EXPIRES_IN: Joi.required(),
  JWT_REFRESH_EXPIRES_IN: Joi.required(),
});
