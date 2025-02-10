import session from "express-session";
import express from "express";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import { config } from "../config";

const redisClient = createClient().connect().catch(console.log);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "socialweb:",
}); // Adjust Redis connection as needed

export const sessionStore: express.RequestHandler = session({
  store: redisStore,
  secret: config.secretSecret,
  resave: false,
  saveUninitialized: true,
  name: config.appName,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  },
});
