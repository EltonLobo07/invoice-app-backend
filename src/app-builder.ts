import express from "express";
import { invoicesRouter } from "./routes/invoices";
import { usersRouter } from "./routes/users";
import { authenticationRouter } from "./routes/authentication";

export const appBuilder = () => {
    const app = express();
    app.use(express.json());
    app.use(invoicesRouter);
    app.use(usersRouter);
    app.use(authenticationRouter);
    return app;
};
