"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupDetailsSchema = void 0;
const zod_1 = require("zod");
const NAME_MAX_LEN = 320;
const EMAIL_MAX_LEN = 320;
const PASSWORD_MIN_LEN = 8;
const PASSWORD_MAX_LEN = 320;
exports.signupDetailsSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(NAME_MAX_LEN),
    email: zod_1.z.string().email().max(EMAIL_MAX_LEN),
    password: zod_1.z.string().min(PASSWORD_MIN_LEN).max(PASSWORD_MAX_LEN)
});
