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
// Create a new express application instance
const app = (0, express_1.default)();
// configuration
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve(__dirname, "views"));
// public directory
app.use(express_1.default.static("public"));
// morgan
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// Secure express apps by setting HTTP response headers
app.use((0, helmet_1.default)());
// compress the request body
app.use((0, compression_1.default)({ filter: shouldCompress }));
function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) {
        return false; // don't compress responses with this request header
    }
    return compression_1.default.filter(req, res); // fallback to standard filter function
}
// session
app.use(session_1.sessionStore);
// setting
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api/auth", auth_1.authRoute);
app.use("/api/user", user_1.userRoute);
app.use(error_handler_1.errorHandler);
// The port the express app will listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map