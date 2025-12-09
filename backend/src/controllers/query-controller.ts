import type { Request, Response, NextFunction } from "express";

import { CreateQueryType } from "../types/query-type.js";
import Query from "../models/query.js";
import Connection from "../models/connection.js";
import CustomError from "../types/error-type.js";
import User from "../models/user.js";

export const readQueries = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  try {
    const queries = await Query.findAll({
      include: [
        {
          model: Connection,
          required: true, // INNER JOIN
          where: { userId },
        }
      ]
    });
    res.status(200).json({ queries });
  } catch (error) {
    next(error);
  }
};

export const createQuery = async (req: Request, res: Response, next: NextFunction) => {
  const { tag, query, connectionId } = req.body as CreateQueryType;
  const userId = req.userId as number;
  const safePayload: CreateQueryType = { tag, query, connectionId };
  try {
    await isUserConnection({ connectionId, userId });
    const query = await Query.create(safePayload);
    res.status(200).json({ query });
  } catch (error) {
    next(error);
  }
};

export const readQuery = async (req: Request, res: Response, next: NextFunction) => {
  const queryId = Number(req.params.queryId);
  const userId = req.userId as number;
  try {
    const query = await Query.findOne({
      include: [
        {
          model: Connection,
          required: true, // INNER JOIN
          where: { userId },
        }
      ],
      where: { id: queryId },
    });

    res.status(200).json({ query });
  } catch (error) {
    next(error);
  }
};

export const updateQuery = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  const queryId = Number(req.params.queryId);
  const { tag, query, connectionId } = req.body as CreateQueryType;
  try {
    await isUserQuery({ queryId, userId });
    await isUserConnection({ connectionId, userId });
    const [updatedRows] = await Query.update({ tag, query, connectionId }, { where: { id: queryId } });
    if (updatedRows === 0) {
      throw new CustomError("Query not found.", 404);
    }
    res.status(200).json({ message: "Query updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteQuery = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  const queryId = Number(req.params.queryId);
  try {
    await isUserQuery({ queryId, userId });
    const deletedRows = await Query.destroy({ where: { id: queryId } });
    if (deletedRows === 0) {
      throw new CustomError("Query not found.", 404);
    }
    res.status(200).json({ message: "Query removed successfully." });
  } catch (error) {
    next(error);
  }
};

const isUserQuery = async ({ queryId, userId }: { queryId: number; userId: number; }) => {
  const query = await Query.findOne({
    include: [
      {
        model: Connection,
        required: true, // INNER JOIN
        include: [
          {
            model: User,
            required: true, // INNER JOIN
            where: { id: userId },
          }
        ]
      }
    ],
    where: { id: queryId },
  });
  if (!query) {
    throw new CustomError("Invalid query.", 401);
  }
};

const isUserConnection = async ({ connectionId, userId }: { connectionId: number; userId: number; }) => {
  const connection = await Connection.findOne({
    where: {
      id: connectionId,
      userId,
    },
  });
  if (!connection) {
    throw new CustomError("Invalid db connection.", 401);
  }
};
