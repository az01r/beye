export interface MessageType {
  _id: string;
  topic: string;
  user: { _id: string; nickname: string };
  content: string;
  createdAt: string;
}
