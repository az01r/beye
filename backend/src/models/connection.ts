import { DataTypes } from "sequelize";
import sequelize from "../util/sequelize.js";
import { ConnectionModel } from "../types/connection-type.js";

const Connection = sequelize.define<ConnectionModel>(
  "Connection",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbType: {
      type: DataTypes.ENUM('MYSQL', 'MONGODB'),
      allowNull: false,
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    port: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dbName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "connections",
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);

export default Connection;
