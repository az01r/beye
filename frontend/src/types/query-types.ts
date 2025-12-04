export interface QueryType {
  id: number;
  query: string;
  connectionId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateQueryType = Pick<QueryType, "query" | "connectionId">;
export type EditQueryType = Pick<QueryType, "id" | "query" | "connectionId">;