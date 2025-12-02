export interface ConnectionType {
  id: number;
  dbType: 'MYSQL' | 'MONGODB';
  host: string;
  port: number;
  dbName: string;
  user: string;
  password: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateConnectionType = Pick<ConnectionType, "dbType" | "host" | "port" | "dbName" | "user" | "password">;
export type EditConnectionType = Pick<ConnectionType, "id" | "dbType" | "host" | "port" | "dbName" | "user" | "password">;