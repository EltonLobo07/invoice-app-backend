import express, { NextFunction, Request, Response } from "express";
import { invoicesRouter } from "./routes/invoices";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { usersRouter } from "./routes/users";
import morgan from "morgan";
import { Token, authenticationRouter } from "./routes/authentication";
import { ZodError } from "zod";

/*
    This declaration is very unsafe because I won't have access to "decodedToken" inside the request 
    handlers of authenticationRouter and usersRouter but TS will still allow me to access it off of the request
    object as I have merged decodedToken with the request object. But I'll be careful and will double
    check before using custom property values off of the request object   
*/
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
    namespace Express {
        export interface Request {
            decodedToken: Token
        }
    }
}

export const appBuilder = () => {
    const app = express();
    app.use(express.json());
    app.use(morgan(":method :url :status :response-time ms"));
    app.use(usersRouter);
    app.use(authenticationRouter);

    app.use((req, res, next) => {
        const { authorization } = req.headers;
        const authHeaderStrPrefix = "bearer ";
        if (authorization === undefined || !authorization.toLowerCase().startsWith(authHeaderStrPrefix)) {
            res.status(401).json({message: "jsonWebToken missing, get one by logging in"});
            return;
        }
        const jsonWebToken = authorization.slice(authHeaderStrPrefix.length);
        if (process.env.JWT_SECRET === undefined) {
            res.status(500).json({message: "Couldn't verify token due to some error"});
            return;
        }
        try {
            req.decodedToken = jwt.verify(jsonWebToken, process.env.JWT_SECRET) as Token;
            next();
        }
        catch(error) {
            next(error);
        }
    });

    app.use(invoicesRouter);

    // Error handler
    app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
        if (error instanceof SyntaxError) {
            res.status(400).json({error: "request body, invalid json"});
            return;
        }
        if (error instanceof ZodError) {
            const [firstZodError] = error.errors;
            res.status(400).json({
                error: `request body, path - ${firstZodError.path.join(".")}, message - ${firstZodError.message}`
            });
            return;
        }
        if (error instanceof JsonWebTokenError) {
            res.status(401).json({
                error: error.message
            });
            return;
        }
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
            return;
        }
        console.log("Unhandled error:", error);
        next(error);
    });

    return app;
};
