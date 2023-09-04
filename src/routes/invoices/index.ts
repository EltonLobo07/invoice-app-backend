import express from "express";
import { getAllInvoices } from "./queries.gen";
import { pool } from "../../pool";
import { helpers } from "../../helpers";

export const invoicesRouter = express.Router();

const BASE_URL = "/invoices";

invoicesRouter.get(BASE_URL, (_req, res) => {
    void (async () => {
        try {        
            const invoices = await getAllInvoices.run(undefined, pool);
            res.json(invoices);
        }
        catch(error) {
            console.log(error);
        }
    })();
});

invoicesRouter.post(BASE_URL, (req, res, next) => {
    (() => {
        try {
            const invoiceData = helpers.validateAndGetInvoiceData(req.body);
            console.log(invoiceData);
            res.json(invoiceData);
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    })();
});
