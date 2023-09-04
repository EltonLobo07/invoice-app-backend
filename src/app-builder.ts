import express from "express";
import { invoicesRouter } from "./routes/invoices";

export const appBuilder = () => {
    const app = express();
    app.use(express.json());
    app.use(invoicesRouter);
    return app;
};
