export interface ScheduleType {
  id: number;
  cron: string;
  queryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
