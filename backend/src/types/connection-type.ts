import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ConnectionModel extends Model<InferAttributes<ConnectionModel>, InferCreationAttributes<ConnectionModel>> {
  id: CreationOptional<number>;
  host: string;
  port: string;
  db_name: string;
  user: string;
  password: string;
  userId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}