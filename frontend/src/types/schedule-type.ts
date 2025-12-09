export interface ScheduleType {
  id: number;
  tag: string;
  cron: string;
  queryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateScheduleType = Pick<ScheduleType, "tag" | "queryId" | "cron">;
export type EditScheduleType = Pick<ScheduleType, "id" | "tag" | "queryId" | "cron">;