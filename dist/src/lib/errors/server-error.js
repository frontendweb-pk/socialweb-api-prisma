"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const custom_error_1 = require("./custom-error");
class ServerError extends custom_error_1.CustomError {
    constructor(message, field) {
        super(message);
        this.field = field;
        this.statusCode = 500;
        Object.setPrototypeOf(this, ServerError.prototype);
    }
    serializeError() {
        return [
            {
                message: this.message,
                field: this.field,
                statusCode: this.statusCode,
            },
        ];
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=server-error.js.map