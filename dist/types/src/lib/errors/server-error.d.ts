import { CustomError } from "./custom-error";
export declare class ServerError extends CustomError {
    field?: string | undefined;
    statusCode: number;
    constructor(message: string, field?: string | undefined);
    serializeError(): {
        message: string;
        statusCode: number;
        field?: string;
    }[];
}
//# sourceMappingURL=server-error.d.ts.map