import cron from "node-cron";

import Schedule from "../models/schedule.js";
import { executeQuery } from "./execute-query.js";
import { ReadScheduleType } from "../types/schedule-type.js";

export const scheduledTasks = new Map<number, cron.ScheduledTask>();

export const initScheduler = async () => {
  const schedules = await Schedule.findAll();
  schedules.forEach((schedule) => {
    scheduleQuery(schedule);
  });
};

export const scheduleQuery = (schedule: ReadScheduleType) => {
  if (scheduledTasks.has(schedule.id)) {
    scheduledTasks.get(schedule.id)?.stop();
  }
  const task = cron.schedule(schedule.cron, async () => {
    await executeQuery(schedule);
  });
  scheduledTasks.set(schedule.id, task);
};

export const unscheduleQuery = (scheduleId: number) => {
  const task = scheduledTasks.get(scheduleId);
  if (task) {
    task.stop();
    scheduledTasks.delete(scheduleId);
  }
};