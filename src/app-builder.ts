import express from "express";
import { invoicesRouter } from "./routes/invoices";
import { usersRouter } from "./routes/users";

export const appBuilder = () => {
    const app = express();
    app.use(express.json());
    app.use(invoicesRouter);
    app.use(usersRouter);
    return app;
};
