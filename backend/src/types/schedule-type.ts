import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ScheduleModel extends Model<InferAttributes<ScheduleModel>, InferCreationAttributes<ScheduleModel>> {
  id: CreationOptional<number>;
  tag: string;
  cron: string;
  fileFormat: 'json' | 'xlsx';
  queryId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type ReadScheduleType = Pick<ScheduleModel, 'id' | 'cron' | 'queryId' | 'fileFormat'>;
export type CreateScheduleType = Pick<ScheduleModel, 'tag' | 'cron' | 'queryId' | 'fileFormat'>;