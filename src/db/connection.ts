
import { Sequelize } from 'sequelize';

export const db = new Sequelize('kiura', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3308,
  dialectOptions: {
    supportBigNumbers: true
  }
});
