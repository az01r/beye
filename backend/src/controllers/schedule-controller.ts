import type { Request, Response, NextFunction } from "express";

import { CreateScheduleType, ReadScheduleType } from "../types/schedule-type.js";
import Schedule from "../models/schedule.js";
import { scheduleQuery, unscheduleQuery } from "../util/query-scheduler.js";
import Query from "../models/query.js";
import Connection from "../models/connection.js";
import CustomError from "../types/error-type.js";

export const readSchedules = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  try {
    const schedules = await Schedule.findAll({
      include: [
        {
          model: Query,
          required: true, // INNER JOIN
          include: [
            {
              model: Connection,
              required: true, // INNER JOIN
              where: { userId },
            }
          ]
        }
      ],
    });
    res.status(200).json({ schedules });
  } catch (error) {
    next(error);
  }
};

export const createSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;

  const { tag, cron, queryId } = req.body as CreateScheduleType;
  try {
    await isUserQuery({ queryId, userId });
    const schedule = await Schedule.create({ tag, cron, queryId });
    scheduleQuery(schedule);
    res.status(200).json({ schedule });
  } catch (error) {
    next(error);
  }
};

export const readSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const scheduleId = Number(req.params.scheduleId);
  const userId = req.userId as number;
  try {
    const schedule = await Schedule.findOne({
      include: [
        {
          model: Query,
          required: true, // INNER JOIN
          include: [
            {
              model: Connection,
              required: true, // INNER JOIN
              where: { userId },
            }
          ]
        }
      ],
      where: { id: scheduleId },
    });

    res.status(200).json({ schedule });
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  const scheduleId = Number(req.params.scheduleId);
  const { tag, cron, queryId } = req.body as CreateScheduleType;
  try {
    await isUserQuery({ queryId, userId });
    const [updatedRows] = await Schedule.update({ tag, cron, queryId }, { where: { id: scheduleId } });
    if (updatedRows === 0) {
      throw new CustomError("Schedule not found.", 404);
    }
    const updatedSchedule: ReadScheduleType = { id: scheduleId, cron, queryId };
    scheduleQuery(updatedSchedule);
    res.status(200).json({ message: "Schedule updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  const scheduleId = Number(req.params.scheduleId);
  try {
    await isUserSchedule({ scheduleId, userId });
    const deletedRows = await Schedule.destroy({ where: { id: scheduleId } });
    if (deletedRows === 0) {
      throw new CustomError("Schedule not found.", 404);
    }
    unscheduleQuery(scheduleId);
    res.status(200).json({ message: "Schedule removed successfully." });
  } catch (error) {
    next(error);
  }
};

const isUserSchedule = async ({ scheduleId, userId }: { scheduleId: number; userId: number; }) => {
  const schedule = await Schedule.findOne({
    include: [
      {
        model: Query,
        required: true, // INNER JOIN
        include: [
          {
            model: Connection,
            required: true, // INNER JOIN
            where: { userId },
          }
        ]
      }
    ],
    where: {
      id: scheduleId,
    },
  });
  if (!schedule) {
    throw new CustomError("Invalid schedule.", 401);
  }
};

const isUserQuery = async ({ queryId, userId }: { queryId: number; userId: number; }) => {
  const query = await Query.findOne({
    include: [
      {
        model: Connection,
        required: true, // INNER JOIN
        where: { userId },
      }
    ],
    where: {
      id: queryId,
    },
  });
  if (!query) {
    throw new CustomError("Invalid schedule.", 401);
  }
};