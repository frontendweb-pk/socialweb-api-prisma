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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
/**
 * Sign in user
 * @param req
 * @param res
 * @param next
 */
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // if user
        const user = yield prisma_client_1.default.user.findUnique({
            where: { email },
            include: {
                role: true,
            },
        });
        if (!user)
            throw new errors_1.BadRequestError("User not found, please register");
        // password verification
        const isMatch = yield password_1.Password.compare(password, user.password);
        if (!isMatch)
            throw new errors_1.AuthError("Invalid password");
        const { password: _ } = user, rest = __rest(user, ["password"]);
        // const token = Jwt.sign({
        //   email: user.email,
        //   user_id: user.user_id,
        //   role: user.role.role_name as string,
        // });
        req.session.user = {
            email: user.email,
            user_id: user.user_id,
            role: user.role.role_name,
        };
        res.status(200).json({
            // token: token,
            expireIn: 3600,
            user: rest,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signIn = signIn;
const verifyMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.verifyMe = verifyMe;
//# sourceMappingURL=auth.js.map