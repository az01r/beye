export interface QueryType {
  id: number;
  tag: string;
  query: string;
  connectionId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateQueryType = Pick<QueryType, "tag" | "query" | "connectionId">;
export type EditQueryType = Pick<QueryType, "id" | "tag" | "query" | "connectionId">;