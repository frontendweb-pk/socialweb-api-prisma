import { ZodError, ZodIssue } from "zod";
import { CustomError } from "./custom-error";

export class RequestValidator extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ZodIssue[], public field?: string) {
    super("Validation error", field);
    Object.setPrototypeOf(this, RequestValidator.prototype);
  }
  serializeError(): { message: string; statusCode: number; field?: string }[] {
    return this.errors.map((error) => ({
      statusCode: this.statusCode,
      field: error.path.join("."),
      message: error.message,
    }));
  }
}
