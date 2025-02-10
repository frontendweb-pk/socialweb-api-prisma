import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import compression from "compression";
import helmet from "helmet";
import path from "path";

// Create a new express application instance
const app = express();

// configuration
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// public directory
app.use(express.static("public"));

// middlewares

// Secure express apps by setting HTTP response headers
app.use(helmet());

// compress the request body
app.use(compression({ filter: shouldCompress }));
function shouldCompress(req: Request, res: Response) {
  if (req.headers["x-no-compression"]) {
    return false; // don't compress responses with this request header
  }
  return compression.filter(req, res); // fallback to standard filter function
}

// production setting

// setting
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// The port the express app will listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
