import dotEnv from 'dotenv';

dotEnv.config();

export const config = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  JWT: process.env.JWT_KEY
};
