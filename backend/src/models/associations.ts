import User from "./user.js";
import Connection from "./connection.js";
import Query from "./query.js";

const defineAssociations = () => {
  User.hasMany(Connection, {
    foreignKey: 'userId'
  });
  Connection.belongsTo(User, {
    foreignKey: 'userId'
  });
  Connection.hasMany(Query, {
    foreignKey: 'connectionId'
  });
  Query.belongsTo(Connection, {
    foreignKey: 'connectionId'
  });
}

export default defineAssociations;
