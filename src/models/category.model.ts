import { DataTypes } from "sequelize";
import { db } from '../db/connection';

const Category = db.define('category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  }

});


export default Category;
