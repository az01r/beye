import type { Request, Response, NextFunction } from "express";

import Connection from "../models/connection.js";
import CustomError from "../types/error-type.js";
import { ScheduleModel } from "../types/schedule-type.js";
import Schedule from "../models/schedule.js";
import { scheduleQuery } from "../util/query-scheduler.js";

export const saveSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scheduleModel = req.body as ScheduleModel;
  const userId = req.userId as number;
  try {
    const connection = await Connection.findOne({
      where: {
        id: scheduleModel.connectionId,
        userId,
      },
    });
    if (!connection) {
      throw new CustomError("Invalid db connection.", 401);
    }
    const schedule = await Schedule.create(scheduleModel);
    scheduleQuery(schedule);
    res.status(200).json({ schedule });
  } catch (error) {
    next(error);
  }
};
