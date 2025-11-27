import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ConnectionModel extends Model<InferAttributes<ConnectionModel>, InferCreationAttributes<ConnectionModel>> {
  id: CreationOptional<number>;
  dbType: 'MYSQL' | 'MONGODB';
  host: string;
  port: string;
  dbName: string;
  user: string;
  password: string;
  userId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}