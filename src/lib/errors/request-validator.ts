import { ZodError, ZodIssue } from "zod";
import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidator extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ValidationError[], public field?: string) {
    super("Validation error", field);
    Object.setPrototypeOf(this, RequestValidator.prototype);
  }
  serializeError(): { message: string; statusCode: number; field?: string }[] {
    return this.errors.map((error) => ({
      statusCode: this.statusCode,
      field: this.field,
      type: error.type,
      message: error.msg,
    }));
  }
}
