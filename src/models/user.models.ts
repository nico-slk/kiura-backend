import { DataTypes } from "sequelize";
import { db } from '../db/connection';

const User = db.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  rol: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar_img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  identity_img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calification: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
});

User.prototype.toJSON = function () {
  const { password, ...user } = this.get();
  return user;
};

export default User;
