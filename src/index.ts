import "dotenv/config";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import compression from "compression";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { errorHandler } from "./middleware/error-handler";
import { limiter } from "./lib/rate-limiter";
import { roleRouter } from "./routes/role";
import { permissionRouter } from "./routes/permission";

// Create a new express application instance
const app = express();

// Configuration for view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// Serve static files (before all other middlewares to allow easy access to static assets)
app.use(express.static("public"));

// Request logging with morgan
if (process.env.NODE_ENV === "development") {
  app.use((req: Request, res: Response, next: NextFunction) => {
    morgan("dev");
    next();
  });
}

// Enable CORS (must come before rate limiting and other security middlewares)
// Whitelist of allowed domains
const whitelist = ["http://localhost:5173"]; // Replace with your front-end URL

// CORS options typed correctly
const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow: boolean) => void
  ) {
    // Allow requests from the whitelist or requests with no origin (like from the same origin)
    if (whitelist.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
};
app.use(cors(corsOptions));

// Rate limiting (to protect against brute force and DoS attacks)
app.use(limiter);

// Secure express apps by setting HTTP response headers using Helmet
app.use(helmet());

// Compress the request body (after CORS and rate limiting but before routing)
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req: Request, res: Response) {
  // Only compress if the header `x-no-compression` is not set
  if (req.headers["x-no-compression"]) {
    return false; // Don't compress responses if this header is set
  }
  return compression.filter(req, res); // Fallback to standard filter function
}

// Body parsers (for handling JSON and URL-encoded data)
app.use(express.json({ limit: "1mb" })); // Limit the request body size to 1MB
app.use(express.urlencoded({ extended: true }));

// Define your routes
app.use("/api/role", roleRouter);
app.use("/api/permission", permissionRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Error handling middleware (this must always be last)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
