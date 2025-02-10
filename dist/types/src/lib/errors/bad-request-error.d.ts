import { CustomError } from "./custom-error";
export declare class BadRequestError extends CustomError {
    field?: string | undefined;
    statusCode: number;
    constructor(message: string, field?: string | undefined);
    serializeError(): {
        message: string;
        statusCode: number;
        field?: string;
    }[];
}
//# sourceMappingURL=bad-request-error.d.ts.map