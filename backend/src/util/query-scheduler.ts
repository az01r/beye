import CustomError from "../types/error-type.js";
import { ReadScheduleType } from "../types/schedule-type.js";
import { config } from "dotenv";
config();

export const scheduleQuery = async (schedule: ReadScheduleType) => {
  const response = await fetch(`${process.env.SCHEDULER_URL}/schedules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(schedule),
  });

  if (!response.ok) {
    throw new CustomError(response.statusText, response.status);
  }
};

export const unscheduleQuery = async (scheduleId: number) => {
  const response = await fetch(`${process.env.SCHEDULER_URL}/schedules/${scheduleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new CustomError(response.statusText, response.status);
  }
};