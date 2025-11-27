import { DataTypes } from "sequelize";
import sequelize from "../util/sequelize.js";
import { UserModel } from "../types/user-type.js";

const User = sequelize.define<UserModel>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);

export default User;