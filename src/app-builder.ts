import express from "express";
import { invoicesRouter } from "./routes/invoices";
import { usersRouter } from "./routes/users";
import { authenticationRouter } from "./routes/authentication";
import { middlewares } from "./middlewares";

export const appBuilder = () => {
    const app = express();
    app.use(express.json());
    app.use(middlewares.requestLogger());
    app.use(usersRouter);
    app.use(authenticationRouter);
    app.use(invoicesRouter);
    app.use(middlewares.unknownEndpoint);
    app.use(middlewares.errorHandler);
    return app;
};
