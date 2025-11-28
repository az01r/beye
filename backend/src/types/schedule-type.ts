import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ScheduleModel extends Model<InferAttributes<ScheduleModel>, InferCreationAttributes<ScheduleModel>> {
  id: CreationOptional<number>;
  cron: string;
  queryId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}