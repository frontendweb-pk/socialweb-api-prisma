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
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const error_handler_1 = require("./middleware/error-handler");
const rate_limiter_1 = require("./lib/rate-limiter");
const role_1 = require("./routes/role");
const permission_1 = require("./routes/permission");
// Create a new express application instance
const app = (0, express_1.default)();
// Configuration for view engine
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve(__dirname, "views"));
// Serve static files (before all other middlewares to allow easy access to static assets)
app.use(express_1.default.static("public"));
// Request logging with morgan
if (process.env.NODE_ENV === "development") {
    app.use((req, res, next) => {
        (0, morgan_1.default)("dev");
        next();
    });
}
// Enable CORS (must come before rate limiting and other security middlewares)
// Whitelist of allowed domains
const whitelist = ["http://localhost:8081", "http://localhost:3000"]; // Replace with your front-end URL
// CORS options typed correctly
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests from the whitelist or requests with no origin (like from the same origin)
        if (whitelist.indexOf(origin || "") !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
};
app.use((0, cors_1.default)(corsOptions));
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
// Body parsers (for handling JSON and URL-encoded data)
app.use(express_1.default.json({ limit: "1mb" })); // Limit the request body size to 1MB
app.use(express_1.default.urlencoded({ extended: true }));
// Define your routes
app.use("/api/role", role_1.roleRouter);
app.use("/api/permission", permission_1.permissionRouter);
app.use("/api/auth", auth_1.authRouter);
app.use("/api/user", user_1.userRouter);
// Error handling middleware (this must always be last)
app.use(error_handler_1.errorHandler);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map