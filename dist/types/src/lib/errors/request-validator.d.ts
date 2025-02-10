import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";
export declare class RequestValidator extends CustomError {
    errors: ValidationError[];
    field?: string | undefined;
    statusCode: number;
    constructor(errors: ValidationError[], field?: string | undefined);
    serializeError(): {
        message: string;
        statusCode: number;
        field?: string;
    }[];
}
//# sourceMappingURL=request-validator.d.ts.map