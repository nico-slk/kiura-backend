import { DataTypes } from "sequelize";
import { db } from '../db/connection';

const Ubication = db.define('ubications', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});


export default Ubication;
