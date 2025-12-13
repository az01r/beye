import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ConnectionModel extends Model<InferAttributes<ConnectionModel>, InferCreationAttributes<ConnectionModel>> {
  id: CreationOptional<number>;
  tag: string;
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

export type CreateConnectionType = Pick<ConnectionModel, 'tag' | 'dbType' | 'host' | 'port' | 'dbName' | 'user' | 'password'>;