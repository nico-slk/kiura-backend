
import { Sequelize } from 'sequelize';
import { config } from '../config/config';

const { DB_HOST } = config;

export const db = new Sequelize('kiura', 'root', 'root', {
  dialect: 'mysql',
  host: DB_HOST,
  port: 3308,
  dialectOptions: {
    supportBigNumbers: true
  }
});
