export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string, field?: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    // Capturing stack trace for easier debugging (optional)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  abstract serializeError(): {
    message: string;
    statusCode: number;
    field?: string;
  }[];
}
