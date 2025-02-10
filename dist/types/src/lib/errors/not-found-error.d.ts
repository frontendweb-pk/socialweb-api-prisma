import { CustomError } from "./custom-error";
export declare class NotFoundError extends CustomError {
    field?: string | undefined;
    statusCode: number;
    constructor(message: string, field?: string | undefined);
    serializeError(): {
        message: string;
        statusCode: number;
        field?: string;
    }[];
}
//# sourceMappingURL=not-found-error.d.ts.map