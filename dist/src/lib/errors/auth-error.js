"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const custom_error_1 = require("./custom-error");
class AuthError extends custom_error_1.CustomError {
    constructor(message, field) {
        super(message, field);
        this.field = field;
        this.statusCode = 401;
        Object.setPrototypeOf(this, AuthError.prototype);
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
exports.AuthError = AuthError;
//# sourceMappingURL=auth-error.js.map