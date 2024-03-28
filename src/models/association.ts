
import Comment from './comments.model';
import Ubication from './ubication.models';
import User from './user.models';

Ubication.belongsTo(User, {
  foreignKey: "userId",
  targetKey: 'id',
});

User.hasOne(Ubication, {
  foreignKey: "userId",
  sourceKey: 'id',
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  targetKey: 'id',
});

User.hasOne(Comment, {
  foreignKey: "userId",
  sourceKey: 'id',
});

User.belongsTo(User, {
  foreignKey: "profesionalId",
  targetKey: 'id',
});

User.hasOne(User, {
  foreignKey: "clientId",
  sourceKey: 'id',
});
