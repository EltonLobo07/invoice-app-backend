import express from "express";
import { autheticationDetailsSchema } from "../validation-schemas/authentication";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../queries/users.queries";
import jwt from "jsonwebtoken";
import { pool } from "../pool";

export const authenticationRouter = express.Router();

authenticationRouter.post("/login", (req, res, next) => {
    void (async () => {
        try {
            const loginDetails = autheticationDetailsSchema.parse(req.body);
            const [userInDb] = await getUserByEmail.run({
                email: loginDetails.email
            }, pool);
            if (!userInDb || !(await bcrypt.compare(loginDetails.password, userInDb.password_hash))) {
                res.status(401).json({message: "invalid credentials"});
                return;
            }
            if (process.env.JWT_SECRET === undefined) {
                res.status(500).json({message: "Couldn't authenticate due to some error at the server"});
                return;
            }
            const token = jwt.sign({
                email: loginDetails.email
            }, process.env.JWT_SECRET);
            res.status(201).json({jsonWebToken: token});
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    })();
});
