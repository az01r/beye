export interface ScheduleType {
  id: number;
  cron: string;
  queryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateScheduleType = Pick<ScheduleType, "queryId" | "cron">;
export type EditScheduleType = Pick<ScheduleType, "id" | "queryId" | "cron">;