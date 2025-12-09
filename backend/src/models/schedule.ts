import { DataTypes } from "sequelize";
import sequelize from "../util/sequelize.js";
import { ScheduleModel } from "../types/schedule-type.js";

const Schedule = sequelize.define<ScheduleModel>(
  "Schedule",
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
    cron: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileFormat: {
      type: DataTypes.ENUM('json', 'xlsx'),
      allowNull: false,
    },
    queryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "schedules",
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);

export default Schedule;
