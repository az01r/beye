import type { Request, Response, NextFunction } from "express";

import Connection from "../models/connection.js";
import { CreateConnectionType } from "../types/connection-type.js";
import CustomError from "../types/error-type.js";

export const readConnections = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  try {
    const connections = await Connection.findAll({
      where: {
        userId,
      },
    });
    res.status(200).json({ connections });
  } catch (error) {
    next(error);
  }
};

export const createConnection = async (req: Request, res: Response, next: NextFunction) => {
  const { dbType, host, port, dbName, user, password } = req.body as CreateConnectionType;
  const safePayload: CreateConnectionType = { dbType, host, port, dbName, user, password };
  const userId = req.userId as number;
  try {
    const connection = await Connection.create({ ...safePayload, userId });
    res.status(200).json({ connection });
  } catch (error) {
    next(error);
  }
};

export const readConnection = async (req: Request, res: Response, next: NextFunction) => {
  const connectionId = Number(req.params.connectionId);
  const userId = req.userId as number;
  try {
    const connection = await Connection.findOne({
      where: {
        id: connectionId,
        userId,
      },
    });
    res.status(200).json({ connection });
  } catch (error) {
    next(error);
  }
};

export const updateConnection = async (req: Request, res: Response, next: NextFunction) => {
  const { dbType, host, port, dbName, user, password } = req.body as CreateConnectionType;
  const safePayload: CreateConnectionType = { dbType, host, port, dbName, user, password };
  const userId = req.userId as number;
  const connectionId = Number(req.params.connectionId);
  try {
    const [updatedRows] = await Connection.update(safePayload, {
      where: {
        id: connectionId,
        userId,
      },
    });
    if (updatedRows === 0) {
      throw new CustomError("Connection not found.", 404);
    }
    res.status(200).json({ message: "Connection updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteConnection = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  const connectionId = Number(req.params.connectionId);
  try {
    const deletedRows = await Connection.destroy({
      where: {
        id: connectionId,
        userId,
      },
    });
    if (deletedRows === 0) {
      throw new CustomError("Connection not found.", 404);
    }
    res.status(200).json({ message: "Connection removed successfully." });
  } catch (error) {
    next(error);
  }
};
