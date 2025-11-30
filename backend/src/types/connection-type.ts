import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ConnectionModel extends Model<InferAttributes<ConnectionModel>, InferCreationAttributes<ConnectionModel>> {
  id: CreationOptional<number>;
  dbType: 'MYSQL' | 'MONGODB';
  host: string;
  port: number;
  dbName: string;
  user: string;
  password: string;
  userId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type CreateConnectionType = Pick<ConnectionModel, 'dbType' | 'host' | 'port' | 'dbName' | 'user' | 'password'>;