"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const regex_1 = require("../lib/regex");
const errors_1 = require("../lib/errors");
const validator_1 = require("../middleware/validator");
const route = express_1.default.Router();
exports.authRoute = route;
const signupSchema = [
    (0, express_validator_1.body)("name", "Name is required!").notEmpty(),
    (0, express_validator_1.body)("email", "Email is required").notEmpty().isEmail(),
    (0, express_validator_1.body)("password", "Password is required")
        .notEmpty()
        .custom((value) => {
        const valid = regex_1.regex.password.test(value);
        if (!valid)
            throw new errors_1.BadRequestError("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.");
        return true;
    }),
    (0, express_validator_1.body)("mobile", "Mobile is required!")
        .notEmpty()
        .custom((value) => {
        const valid = regex_1.regex.mobile.test(value);
        if (!valid)
            throw new errors_1.BadRequestError("Mobile number must be a valid Indian mobile number starting with 6-9 and followed by 9 digits.");
        return true;
    }),
];
route.post("/signup", signupSchema, validator_1.requestValidator, auth_1.signUp);
//# sourceMappingURL=auth.js.map