"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMe = exports.signUp = exports.signIn = void 0;
const prisma_client_1 = __importDefault(require("../lib/prisma-client"));
const errors_1 = require("../lib/errors");
const password_1 = require("../lib/password");
/**
 * Register new user
 * @param req
 * @param res
 * @param next
 */
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role_id = 1, mobile } = req.body;
        const isEmail = yield prisma_client_1.default.user.findUnique({
            where: { email: email },
        });
        if (isEmail) {
            throw new errors_1.BadRequestError("Email already associated with us!");
        }
        const hasedPassword = yield password_1.Password.hash(password);
        const user = yield prisma_client_1.default.user.create({
            data: {
                name,
                email,
                password: hasedPassword,
                role_id,
                mobile,
            },
            omit: {
                password: true,
            },
        });
        res.status(201).send(user);
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.signIn = signIn;
const verifyMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.verifyMe = verifyMe;
//# sourceMappingURL=auth.js.map