import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ReportModel extends Model<InferAttributes<ReportModel>, InferCreationAttributes<ReportModel>> {
  id: CreationOptional<number>;
  fileName: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
