import express from "express";
import { signupDetailsSchema } from "../validation-schemas/users";
import bcrypt from "bcrypt";
import { addUser, getUserByEmail } from "../queries/users.queries";
import { pool } from "../pool";
import { helpers } from "../helpers";

export const usersRouter = express.Router();

usersRouter.post("/users", (req, res, next) => {
    void (async () => {
        try {
            const signupDetails = signupDetailsSchema.parse(req.body);
            const [user] = await getUserByEmail.run({
                email: signupDetails.email
            }, pool);
            if (user) {
                res.status(409).json({message: "email already present"});
                return;
            }
            const passwordHash = await bcrypt.hash(signupDetails.password, 10);
            const [addedUser] = await addUser.run({
                name: signupDetails.name,
                email: signupDetails.email,
                passwordHash
            }, pool);
            if (!addedUser) {
                res.status(500).json("Couldn't add user due to some error at the server");
                return;
            }
            res.status(201).json(helpers.recursiveKeyCamelCase(addedUser));
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    })();
});
