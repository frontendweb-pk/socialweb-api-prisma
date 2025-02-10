"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStore = void 0;
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const connect_redis_1 = require("connect-redis");
const config_1 = require("../config");
const redisClient = (0, redis_1.createClient)().connect().catch(console.log);
let redisStore = new connect_redis_1.RedisStore({
    client: redisClient,
    prefix: "socialweb:",
}); // Adjust Redis connection as needed
exports.sessionStore = (0, express_session_1.default)({
    store: redisStore,
    secret: config_1.config.secretSecret,
    resave: false,
    saveUninitialized: true,
    name: config_1.config.appName,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    },
});
//# sourceMappingURL=session.js.map