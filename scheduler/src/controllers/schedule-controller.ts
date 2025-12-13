import type { Request, Response, NextFunction } from "express";

import { ScheduleModel } from "../types/schedule-type.js";
import { scheduleQuery, unscheduleQuery } from "../util/query-scheduler.js";

export const addSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const schedule = req.body as ScheduleModel;
  try {
    scheduleQuery(schedule);
    res.status(200).json({ message: "Report scheduled successfully." });
  } catch (error) {
    next(error);
  }
};

export const removeSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const scheduleId = Number(req.params.scheduleId);
  try {
    unscheduleQuery(scheduleId);
    res.status(200).json({ message: "Schedule removed successfully." });
  } catch (error) {
    next(error);
  }
};
