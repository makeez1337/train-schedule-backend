import { ConfigObject } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default (): ConfigObject => ({
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  },
});
