import cron from "node-cron";

import { ScheduleModel } from "../types/schedule-type.js";
import Schedule from "../models/schedule.js";
import { executeQuery } from "./execute-query.js";

export const scheduleQuery = (schedule: ScheduleModel) => {
  cron.schedule(schedule.cron, async () => {
    await executeQuery(schedule);
  });
};

export const initScheduler = async () => {
  const schedules = await Schedule.findAll();
  schedules.forEach((schedule) => {
    scheduleQuery(schedule);
  });
};
