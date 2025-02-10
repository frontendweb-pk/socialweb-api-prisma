export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string, field?: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeError(): {
    message: string;
    statusCode: number;
    field?: string;
  }[];
}
