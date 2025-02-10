export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string, field?: string);
    abstract serializeError(): {
        message: string;
        statusCode: number;
        field?: string;
    }[];
}
//# sourceMappingURL=custom-error.d.ts.map