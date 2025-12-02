export interface QueryType {
  id: number;
  query: string;
  connectionId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
