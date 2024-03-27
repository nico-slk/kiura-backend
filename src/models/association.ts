
import Ubication from './ubication.models';
import User from './user.models';

// Añade una clave userId a la tabla addresses
Ubication.belongsTo(User, {
  foreignKey: "userId",
  targetKey: 'id',
});
// añadir una clave foranea userId a la tabla addresses
User.hasOne(Ubication, {
  foreignKey: "userId",
  sourceKey: 'id',
});

