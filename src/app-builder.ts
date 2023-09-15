import express from "express";
import { invoicesRouter } from "./routes/invoices";
import cors from "cors";
import { usersRouter } from "./routes/users";
import { authenticationRouter } from "./routes/authentication";
import { middlewares } from "./middlewares";
import path from "path";

export const appBuilder = () => {
    const app = express();
    app.use(cors());
    app.use(express.static("frontend_dist"));
    app.use(express.json());
    // app.use(middlewares.requestLogger());
    app.use(usersRouter);
    app.use(authenticationRouter);
    app.use(invoicesRouter);
    // For react router routes to work properly (redirects all get requests to index.html)
    if (process.env.NODE_ENV === "production") {
        app.get("*", (_req, res) => {
                res.sendFile(path.resolve(process.cwd(), "frontend_dist", "index.html"));
        });
    }
    app.use(middlewares.unknownEndpoint);
    app.use(middlewares.errorHandler);
    return app;
};
