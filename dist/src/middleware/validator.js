"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidator = requestValidator;
const express_validator_1 = require("express-validator");
const errors_1 = require("../lib/errors");
function requestValidator(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        throw new errors_1.RequestValidator(result.array());
    }
    next();
}
//# sourceMappingURL=validator.js.map