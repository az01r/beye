import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>;
  email: string;
  password: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}