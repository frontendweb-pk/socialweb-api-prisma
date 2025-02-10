import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;
  constructor(message: string, public field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, BadRequestError.prototype);
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
