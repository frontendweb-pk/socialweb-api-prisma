"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
// Create a new express application instance
const app = (0, express_1.default)();
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
// production setting
// setting
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// The port the express app will listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map