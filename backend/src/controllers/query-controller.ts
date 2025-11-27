import type { Request, Response, NextFunction } from "express";

import { QueryModel } from "../types/query-type.js";
import Query from "../models/query.js";
import { where } from "sequelize";
import Connection from "../models/connection.js";
import CustomError from "../types/error-type.js";

export const saveQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryModel = req.body as QueryModel;
  try {
    const query = await Query.create(queryModel);
    res.status(200).json({ query });
  } catch (error) {
    next(error);
  }
};

export const getQueriesByConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connectionId = req.body.connectionId as number;
  const userId = req.userId as number;
  try {
    const connection = await Connection.findOne({
      where: {
        id: connectionId,
        userId
      }
    });
    if (!connection) {
      throw new CustomError('Invalid db connection.', 401);
    }
    const queries = await Query.findAll({ where: { connectionId } });
    res.status(200).json({ queries });
  } catch (error) {
    next(error);
  }
};
