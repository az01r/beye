export default class CustomError {
  message: string | string[];
  status: number;

  constructor(message: string | string[], status: number) {
    this.message = message;
    this.status = status;
  }
}
