import { z } from "zod";

const NAME_MAX_LEN = 320;
const EMAIL_MAX_LEN = 320;
const PASSWORD_MIN_LEN = 8;
const PASSWORD_MAX_LEN = 320;

export const signupDetailsSchema = z.object({
    name: z.string().min(1).max(NAME_MAX_LEN),
    email: z.string().email().max(EMAIL_MAX_LEN),
    password: z.string().min(PASSWORD_MIN_LEN).max(PASSWORD_MAX_LEN)
});
