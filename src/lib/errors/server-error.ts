import { CustomError } from "./custom-error";

export class ServerError extends CustomError {
  statusCode: number = 500;
  constructor(message: string, public field?: string) {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
  serializeError(): { message: string; statusCode: number; field?: string }[] {
    return [
      {
        message: this.message,
        field: this.field,
        statusCode: this.statusCode,
      },
    ];
  }
}
