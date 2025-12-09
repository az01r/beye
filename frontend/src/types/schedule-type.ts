export interface ScheduleType {
  id: number;
  tag: string;
  cron: string;
  queryId: number;
  fileFormat: 'json' | 'xlsx';
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateScheduleType = Pick<ScheduleType, "tag" | "queryId" | "cron" | "fileFormat">;
export type EditScheduleType = Pick<ScheduleType, "id" | "tag" | "queryId" | "cron" | "fileFormat">;