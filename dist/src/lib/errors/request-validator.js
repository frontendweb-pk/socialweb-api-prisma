"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidator extends custom_error_1.CustomError {
    constructor(errors, field) {
        super("Validation error", field);
        this.errors = errors;
        this.field = field;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidator.prototype);
    }
    serializeError() {
        return this.errors.map((error) => ({
            statusCode: this.statusCode,
            field: this.field,
            type: error.type,
            message: error.msg,
        }));
    }
}
exports.RequestValidator = RequestValidator;
//# sourceMappingURL=request-validator.js.map