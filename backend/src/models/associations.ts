import User from "./user.js";
import Connection from "./connection.js";
import Query from "./query.js";
import Schedule from "./schedule.js";

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
  Schedule.hasOne(Query, {
    foreignKey: 'queryId'
  });
  Schedule.belongsTo(Query, {
    foreignKey: 'queryId'
  });
  Schedule.hasOne(Connection, {
    foreignKey: 'connectionId'
  });
  Schedule.belongsTo(Connection, {
    foreignKey: 'connectionId'
  });
}

export default defineAssociations;
