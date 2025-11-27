import User from "./user.js";
import Connection from "./connection.js";

const defineAssociations = () => {
User.hasMany(Connection, {
  foreignKey: 'userId',
  // as: 'connections'
});
Connection.belongsTo(User, {
  foreignKey: 'userId',
  // as: 'users'
});
}

export default defineAssociations;
