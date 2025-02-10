import { CustomError } from "./custom-error";

export class AuthError extends CustomError {
  statusCode: number = 401;
  constructor(message: string, public field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, AuthError.prototype);
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
