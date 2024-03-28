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
    allowNull: false,
    defaultValue: 'NORMAL'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar_img: {
    type: DataTypes.STRING,
  },
  identity_img: {
    type: DataTypes.STRING,
  },
  calification: {
    type: DataTypes.DOUBLE,
  },
  aproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  ubicationId: {
    type: DataTypes.UUID,
  },
  userContratated: {
    type: DataTypes.UUID,
  },
  userClient: {
    type: DataTypes.UUID,
  }
});

User.prototype.toJSON = function () {
  const { password, ...user } = this.get();
  return user;
};

export default User;
