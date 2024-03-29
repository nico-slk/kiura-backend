
import Category from './category.model';
import Comment from './comments.model';
import Ubication from './ubication.models';
import User from './user.models';

//Ubicacion usuarios
User.belongsTo(Ubication, {
  foreignKey: "ubicationId",
  targetKey: 'id',
});

Ubication.hasOne(User, {
  foreignKey: "ubicationId",
  sourceKey: 'id',
});
//

// Comentario usuario
Comment.belongsTo(User, {
  foreignKey: "userId",
  targetKey: 'id',
});

User.hasOne(Comment, {
  foreignKey: "userId",
  sourceKey: 'id',
});
//

// Contrato profesional
User.belongsTo(User, {
  foreignKey: "cliendId",
  targetKey: 'id',
});

User.hasOne(User, {
  foreignKey: "profesionalId",
  sourceKey: 'id',
});
//

// Categorias
User.belongsTo(Category, {
  foreignKey: "profesionalCategory",
  targetKey: 'id',
});

Category.hasOne(User, {
  foreignKey: "profesionalCategory",
  sourceKey: 'id',
});
//
