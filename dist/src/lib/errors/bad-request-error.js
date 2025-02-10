"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_error_1 = require("./custom-error");
class BadRequestError extends custom_error_1.CustomError {
    constructor(message, field) {
        super(message, field);
        this.field = field;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
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
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=bad-request-error.js.map