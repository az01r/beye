import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface QueryModel extends Model<InferAttributes<QueryModel>, InferCreationAttributes<QueryModel>> {
  id: CreationOptional<number>;
  tag: string;
  query: string;
  connectionId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type CreateQueryType = Pick<QueryModel, 'tag' | 'query' | 'connectionId'>;