import type { Request, Response, NextFunction } from "express";

import Connection from "../models/connection.js";
import { ConnectionModel } from "../types/connection-type.js";

export const saveConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connModel = req.body as ConnectionModel;
  connModel.userId = req.userId!;
  try {
    const connection = await Connection.create(connModel);
    res.status(200).json({ connection });
  } catch (error) {
    next(error);
  }
};

export const getUserConnections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId as string;
  try {
    const connection = await Connection.findAll({
      where: {
        userId,
      },
    });
    res.status(200).json({ connection });
  } catch (error) {
    next(error);
  }
};
