import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor(message: string, public field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, NotFoundError.prototype);
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
