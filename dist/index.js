"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const session_1 = require("./lib/session");
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const error_handler_1 = require("./middleware/error-handler");
const rate_limiter_1 = require("./lib/rate-limiter");
const role_1 = require("./routes/role");
// Create a new express application instance
const app = (0, express_1.default)();
// Configuration for view engine
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve(__dirname, "views"));
// Serve static files (before all other middlewares to allow easy access to static assets)
app.use(express_1.default.static("public"));
// Request logging with morgan
app.use((0, morgan_1.default)("dev"));
// Enable CORS (must come before rate limiting and other security middlewares)
app.use((0, cors_1.default)());
// Rate limiting (to protect against brute force and DoS attacks)
app.use(rate_limiter_1.limiter);
// Secure express apps by setting HTTP response headers using Helmet
app.use((0, helmet_1.default)());
// Compress the request body (after CORS and rate limiting but before routing)
app.use((0, compression_1.default)({ filter: shouldCompress }));
function shouldCompress(req, res) {
    // Only compress if the header `x-no-compression` is not set
    if (req.headers["x-no-compression"]) {
        return false; // Don't compress responses if this header is set
    }
    return compression_1.default.filter(req, res); // Fallback to standard filter function
}
// Session middleware (ensure that sessions are available to all subsequent routes)
app.use(session_1.sessionStore);
// Body parsers (for handling JSON and URL-encoded data)
app.use(express_1.default.json({ limit: "1mb" })); // Limit the request body size to 1MB
app.use(express_1.default.urlencoded({ extended: true }));
// Define your routes
app.use("/api/role", role_1.roleRouter);
app.use("/api/auth", auth_1.authRoute);
app.use("/api/user", user_1.userRoute);
// Error handling middleware (this must always be last)
app.use(error_handler_1.errorHandler);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map