import { CustomError } from "./custom-error";
export declare class AuthError extends CustomError {
    field?: string | undefined;
    statusCode: number;
    constructor(message: string, field?: string | undefined);
    serializeError(): {
        message: string;
        statusCode: number;
        field?: string;
    }[];
}
//# sourceMappingURL=auth-error.d.ts.map