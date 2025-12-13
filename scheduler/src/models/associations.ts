import User from "./user.js";
import Connection from "./connection.js";
import Query from "./query.js";
import Schedule from "./schedule.js";
import Report from "./report.js";

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
  Query.hasMany(Schedule, {
    foreignKey: 'queryId'
  });
  Schedule.belongsTo(Query, {
    foreignKey: 'queryId'
  });
  User.hasMany(Report, {
    foreignKey: 'userId'
  });
  Report.belongsTo(User, {
    foreignKey: 'userId'
  });
}

export default defineAssociations;
