"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = void 0;
exports.regex = {
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    mobile: /^[6-9][0-9]{9}$/,
};
//# sourceMappingURL=regex.js.map