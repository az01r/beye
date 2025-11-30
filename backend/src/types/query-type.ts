import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface QueryModel extends Model<InferAttributes<QueryModel>, InferCreationAttributes<QueryModel>> {
  id: CreationOptional<number>;
  query: string;
  connectionId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type CreateQueryType = Pick<QueryModel, 'query' | 'connectionId'>;
export type DeleteQueryType = Pick<QueryModel, 'connectionId'>;