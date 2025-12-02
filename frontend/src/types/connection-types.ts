export interface ConnectionType {
  id: number;
  dbType: 'MYSQL' | 'MONGODB';
  host: string;
  port: number;
  dbName: string;
  user: string;
  password: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}