import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { 
    NextFunction, 
    Request, 
    Response 
} from "express";
import { Token } from "./routes/authentication";
import { ZodError } from "zod";
import morgan from "morgan";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
    namespace Express {
        export interface Request {
            decodedToken?: Token
        }
    }
}

function requestLogger() {
    return morgan(":method :url :status :response-time ms");
}

function extractAndDecodeToken(req: Request, res: Response, next: NextFunction) {
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
}

function unknownEndpoint(_req: Request, res: Response) {
    res.status(404).json({error: "unknown endpoint"});
}

function errorHandler(error: unknown, _req: Request, res: Response, next: NextFunction) {
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
}

export const middlewares = {
    extractAndDecodeToken,
    unknownEndpoint,
    errorHandler,
    requestLogger
};
