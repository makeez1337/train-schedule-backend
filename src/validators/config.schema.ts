import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.required(),
  DB_USER: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_DATABASE: Joi.required(),
  BCRYPT_SALT: Joi.required(),
  JWT_ACCESS_SECRET: Joi.required(),
  JWT_REFRESH_SECRET: Joi.required(),
  JWT_ACCESS_EXPIRES_IN: Joi.required(),
  JWT_REFRESH_EXPIRES_IN: Joi.required(),
});
