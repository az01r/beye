import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ScheduleModel extends Model<InferAttributes<ScheduleModel>, InferCreationAttributes<ScheduleModel>> {
  id: CreationOptional<number>;
  tag: string;
  cron: string;
  queryId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type ReadScheduleType = Pick<ScheduleModel, 'id' | 'cron' | 'queryId'>;
export type CreateScheduleType = Pick<ScheduleModel, 'tag' | 'cron' | 'queryId'>;