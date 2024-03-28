import { DataTypes } from "sequelize";
import { db } from '../db/connection';

const Comment = db.define('comments', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  autorId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  comment: {
    type: DataTypes.STRING,
  }

});


export default Comment;
