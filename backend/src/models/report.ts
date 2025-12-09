import { DataTypes } from "sequelize";
import sequelize from "../util/sequelize.js";
import { ReportModel } from "../types/report-type.js";

const Report = sequelize.define<ReportModel>(
  "Report",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "reports",
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);

export default Report;
