"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("./errors");
const DEFAULT_OPTIONS = {
    expiresIn: "1h",
};
class Jwt {
    static sign(payload, options = DEFAULT_OPTIONS) {
        return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, options);
    }
    static verify(token) {
        return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, decode) => {
            if (error) {
                throw new errors_1.AuthError(error.message);
            }
            return decode;
        });
    }
}
exports.Jwt = Jwt;
//# sourceMappingURL=jwt.js.map