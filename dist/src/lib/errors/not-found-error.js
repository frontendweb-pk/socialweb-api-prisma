"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class NotFoundError extends custom_error_1.CustomError {
    constructor(message, field) {
        super(message, field);
        this.field = field;
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
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
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found-error.js.map