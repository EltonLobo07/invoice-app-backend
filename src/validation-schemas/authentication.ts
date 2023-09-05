import { z } from "zod";

export const autheticationDetailsSchema = z.object({
    email: z.string().email(),
    password: z.string()
});
